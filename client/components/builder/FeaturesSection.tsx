import React from "react";
import { LandingPageBlock } from "@/components/landing-page-builder/types";
import { FeatureGridItemStyles } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Copy, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturesSectionProps {
  block: LandingPageBlock;
  onUpdate: (block: LandingPageBlock) => void;
  onSelect?: (elementInfo: { type: string; id?: string } | null) => void;
  selectedFeatureId?: string | null;
  selectedHeaderElement?: string | null;
  imageUrl?: string;
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  styles?: FeatureGridItemStyles;
}

interface HeaderElement {
  id: string;
  type: "heading" | "description";
  text: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  block,
  onUpdate,
  onSelect,
  selectedFeatureId: controlledSelectedFeatureId = null,
  selectedHeaderElement,
  imageUrl,
}) => {
  const [selectedFeatureId, setSelectedFeatureId] = React.useState<string | null>(controlledSelectedFeatureId);
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = React.useState<{
    featureId: string;
    element: "icon" | "title" | "description";
  } | null>(null);
  const [editingFeatureId, setEditingFeatureId] = React.useState<string | null>(null);
  const [hoveredHeaderElement, setHoveredHeaderElement] = React.useState<string | null>(null);
  const [localSelectedHeaderElement, setLocalSelectedHeaderElement] = React.useState<string | null>(selectedHeaderElement ?? null);
  const [isClickingControl, setIsClickingControl] = React.useState(false);
  const [editingHeaderElementId, setEditingHeaderElementId] = React.useState<string | null>(null);
  const [editingFeatureElementId, setEditingFeatureElementId] = React.useState<string | null>(null);
  const headerElementRefsMap = React.useRef<Record<string, HTMLElement | null>>({});
  const featureElementRefsMap = React.useRef<Record<string, HTMLElement | null>>({});

  const features: Feature[] = (block.properties.features || []) as Feature[];

  const initializeHeaderElements = React.useCallback((): HeaderElement[] => {
    if (block.properties.headerElements && Array.isArray(block.properties.headerElements) && block.properties.headerElements.length > 0) {
      return block.properties.headerElements as HeaderElement[];
    }

    const elements: HeaderElement[] = [];

    if (block.properties.heading) {
      elements.push({
        id: "heading",
        type: "heading",
        text: block.properties.heading,
      });
    }

    if (block.properties.description) {
      elements.push({
        id: "description",
        type: "description",
        text: block.properties.description,
      });
    }

    return elements;
  }, [block.properties.description, block.properties.headerElements, block.properties.heading]);

  const initializedHeaderElements = React.useMemo(() => initializeHeaderElements(), [initializeHeaderElements]);
  const [headerElements, setHeaderElements] = React.useState<HeaderElement[]>(initializedHeaderElements);

  React.useEffect(() => {
    setSelectedFeatureId(controlledSelectedFeatureId);
  }, [controlledSelectedFeatureId]);

  React.useEffect(() => {
    setLocalSelectedHeaderElement(selectedHeaderElement ?? null);
  }, [selectedHeaderElement]);

  React.useEffect(() => {
    setHeaderElements(initializedHeaderElements);
  }, [initializedHeaderElements]);

  React.useEffect(() => {
    if ((!block.properties.headerElements || block.properties.headerElements.length === 0) && initializedHeaderElements.length > 0) {
      onUpdate({
        ...block,
        properties: {
          ...block.properties,
          headerElements: initializedHeaderElements,
        },
      });
    }
  }, [block.id, block.properties.description, block.properties.headerElements, block.properties.heading, initializedHeaderElements, onUpdate]);

  const handleCopyFeature = (featureId: string) => {
    const featureToCopy = features.find(f => f.id === featureId);
    if (!featureToCopy) return;

    // Create a duplicate feature with a new ID
    const newFeatureId = `feature-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duplicatedFeature: Feature = {
      ...featureToCopy,
      id: newFeatureId,
    };

    // Find the index and insert after it
    const featureIndex = features.findIndex(f => f.id === featureId);
    const updatedFeatures = [...features];
    updatedFeatures.splice(featureIndex + 1, 0, duplicatedFeature);

    onUpdate({
      ...block,
      properties: {
        ...block.properties,
        features: updatedFeatures,
      },
    });

    setSelectedFeatureId(newFeatureId);
    onSelect?.({ type: "feature", id: newFeatureId });
  };

  const handleDeleteFeature = (featureId: string) => {
    const updatedFeatures = features.filter(f => f.id !== featureId);
    onUpdate({
      ...block,
      properties: {
        ...block.properties,
        features: updatedFeatures,
      },
    });
    setSelectedFeatureId(null);
    onSelect?.(null);
  };

  const handleAddFeature = (featureId: string) => {
    // Add is the same as copy
    handleCopyFeature(featureId);
  };

  const handleUpdateFeature = (featureId: string, updates: Partial<Feature>) => {
    const updatedFeatures = features.map(f =>
      f.id === featureId ? { ...f, ...updates } : f
    );

    onUpdate({
      ...block,
      properties: {
        ...block.properties,
        features: updatedFeatures,
      },
    });
  };

  const handleUpdateBlock = (updates: Record<string, any>) => {
    onUpdate({
      ...block,
      properties: {
        ...block.properties,
        ...updates,
      },
    });
  };

  const renderControls = (featureId: string) => {
    if (selectedFeatureId !== featureId || editingFeatureId === featureId) {
      return null;
    }

    return (
      <div
        className="absolute top-1 right-1 flex items-center gap-1 bg-white rounded-md shadow-lg border border-valasys-orange/20 z-[100] pointer-events-auto"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCopyFeature(featureId);
          }}
          className="h-6 w-6 flex items-center justify-center hover:bg-valasys-orange/10 rounded transition-colors cursor-pointer"
          title="Copy feature"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddFeature(featureId);
          }}
          className="h-6 w-6 flex items-center justify-center hover:bg-valasys-orange/10 rounded transition-colors cursor-pointer"
          title="Add feature"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteFeature(featureId);
          }}
          className="h-6 w-6 flex items-center justify-center hover:bg-red-100 text-red-500 rounded transition-colors cursor-pointer"
          title="Delete feature"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  };

  const handleCopyHeaderElement = (elementId: string) => {
    const element = headerElements.find(e => e.id === elementId);
    if (!element) return;

    // Create a duplicate with a new ID and insert after the original
    const newElement: HeaderElement = {
      ...element,
      id: `${element.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    const elementIndex = headerElements.findIndex(e => e.id === elementId);
    const updatedElements = [...headerElements];
    updatedElements.splice(elementIndex + 1, 0, newElement);

    setHeaderElements(updatedElements);
    onUpdate({
      ...block,
      properties: {
        ...block.properties,
        headerElements: updatedElements,
      },
    });

    setLocalSelectedHeaderElement(newElement.id);
    onSelect?.({ type: newElement.type, id: newElement.id });
  };

  const handleAddHeaderElement = (elementId: string) => {
    // Add is the same as copy
    handleCopyHeaderElement(elementId);
  };

  const handleDeleteHeaderElement = (elementId: string) => {
    const updatedElements = headerElements.filter(e => e.id !== elementId);
    setHeaderElements(updatedElements);
    onUpdate({
      ...block,
      properties: {
        ...block.properties,
        headerElements: updatedElements,
      },
    });
    setLocalSelectedHeaderElement(null);
    onSelect?.(null);
  };

  const handleUpdateHeaderElement = (elementId: string, newText: string) => {
    const updatedElements = headerElements.map(e =>
      e.id === elementId ? { ...e, text: newText } : e
    );
    setHeaderElements(updatedElements);
    onUpdate({
      ...block,
      properties: {
        ...block.properties,
        headerElements: updatedElements,
      },
    });
  };

  const renderHeaderControls = (elementId: string) => {
    if (localSelectedHeaderElement !== elementId) {
      return null;
    }

    return (
      <div
        className="absolute top-1 right-1 flex items-center gap-1 bg-white rounded-md shadow-lg border border-valasys-orange/20 z-[100] pointer-events-auto"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsClickingControl(true);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCopyHeaderElement(elementId);
            setIsClickingControl(false);
          }}
          className="h-6 w-6 flex items-center justify-center hover:bg-valasys-orange/10 rounded transition-colors cursor-pointer"
          title="Copy text"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsClickingControl(true);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddHeaderElement(elementId);
            setIsClickingControl(false);
          }}
          className="h-6 w-6 flex items-center justify-center hover:bg-valasys-orange/10 rounded transition-colors cursor-pointer"
          title="Add/Duplicate"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsClickingControl(true);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteHeaderElement(elementId);
            setIsClickingControl(false);
          }}
          className="h-6 w-6 flex items-center justify-center hover:bg-red-100 text-red-500 rounded transition-colors cursor-pointer"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  };

  const isSelected = (featureId: string) => selectedFeatureId === featureId;
  const isCardHovered = (featureId: string) => hoveredCardId === featureId;
  const isElementHovered = (featureId: string, element: "icon" | "title" | "description") =>
    hoveredElement?.featureId === featureId && hoveredElement?.element === element;

  const getFeatureStyles = (feature: Feature): React.CSSProperties => {
    const styles = feature.styles;

    if (!styles) {
      return {};
    }

    const cardStyles: React.CSSProperties = {};

    if (styles.width !== undefined) {
      cardStyles.width = `${styles.width}${styles.widthUnit || "%"}`;
    }

    if (styles.height !== undefined) {
      cardStyles.minHeight = `${styles.height}${styles.heightUnit || "px"}`;
    }

    if (styles.padding !== undefined) {
      cardStyles.padding = `${styles.padding}px`;
    }

    if (styles.paddingTop !== undefined) cardStyles.paddingTop = `${styles.paddingTop}px`;
    if (styles.paddingRight !== undefined) cardStyles.paddingRight = `${styles.paddingRight}px`;
    if (styles.paddingBottom !== undefined) cardStyles.paddingBottom = `${styles.paddingBottom}px`;
    if (styles.paddingLeft !== undefined) cardStyles.paddingLeft = `${styles.paddingLeft}px`;

    if (styles.margin !== undefined) {
      cardStyles.margin = `${styles.margin}px`;
    }

    if (styles.marginTop !== undefined) cardStyles.marginTop = `${styles.marginTop}px`;
    if (styles.marginRight !== undefined) cardStyles.marginRight = `${styles.marginRight}px`;
    if (styles.marginBottom !== undefined) cardStyles.marginBottom = `${styles.marginBottom}px`;
    if (styles.marginLeft !== undefined) cardStyles.marginLeft = `${styles.marginLeft}px`;

    if (styles.borderWidth !== undefined) {
      cardStyles.borderWidth = `${styles.borderWidth}px`;
      cardStyles.borderStyle = "solid";
    }

    if (styles.borderColor) cardStyles.borderColor = styles.borderColor;
    if (styles.borderRadius !== undefined) cardStyles.borderRadius = `${styles.borderRadius}px`;
    if (styles.backgroundColor) cardStyles.backgroundColor = styles.backgroundColor;
    if (styles.textColor) cardStyles.color = styles.textColor;
    if (styles.fontSize !== undefined) cardStyles.fontSize = `${styles.fontSize}${styles.fontSizeUnit || "px"}`;
    if (styles.textAlign) cardStyles.textAlign = styles.textAlign;
    if (styles.justifyContent) cardStyles.justifyContent = styles.justifyContent;

    if (styles.backgroundImageUrl) {
      const imageUrl = styles.backgroundImageUrl.replace(/"/g, '\\"');
      cardStyles.backgroundImage = `url("${imageUrl}")`;
      cardStyles.backgroundSize = styles.backgroundSize || "cover";
      cardStyles.backgroundPosition = styles.backgroundPosition || "center";
      cardStyles.backgroundRepeat = styles.backgroundRepeat || "no-repeat";
      cardStyles.backgroundAttachment = styles.backgroundAttachment || "scroll";
      if (!cardStyles.minHeight) {
        cardStyles.minHeight = "300px";
      }
    }

    if (styles.backgroundOpacity !== undefined) {
      cardStyles.opacity = styles.backgroundOpacity / 100;
    }

    return cardStyles;
  };

  return (
    <div className="relative w-full overflow-hidden bg-white p-8 rounded-3xl border border-gray-100">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          {headerElements.map((element) => {
            const isHeading = element.type === "heading";
            const TagName = isHeading ? "h2" : "p";
            const isEditingHeaderElement = localSelectedHeaderElement === element.id;
            const fallbackText = isHeading ? "Why Choose Us" : "Discover the key features that make our product special";

            return (
              <div key={element.id} className="relative">
                {isEditingHeaderElement ? (
                  isHeading ? (
                    <Input
                      value={element.text}
                      onChange={(e) => handleUpdateHeaderElement(element.id, e.target.value)}
                      onBlur={() => {
                        if (!isClickingControl) {
                          setLocalSelectedHeaderElement(null);
                          onSelect?.(null);
                        }
                      }}
                      onFocus={() => onSelect?.({ type: element.type, id: element.id })}
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "h-auto w-full border-2 border-solid border-valasys-orange bg-transparent px-2 py-1 text-center text-3xl font-bold text-gray-900 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                        isHeading && "tracking-tight"
                      )}
                      style={{ direction: "ltr" }}
                      autoFocus
                    />
                  ) : (
                    <Textarea
                      value={element.text}
                      onChange={(e) => handleUpdateHeaderElement(element.id, e.target.value)}
                      onBlur={() => {
                        if (!isClickingControl) {
                          setLocalSelectedHeaderElement(null);
                          onSelect?.(null);
                        }
                      }}
                      onFocus={() => onSelect?.({ type: element.type, id: element.id })}
                      onClick={(e) => e.stopPropagation()}
                      className="min-h-0 w-full resize-none border-2 border-solid border-valasys-orange bg-transparent px-2 py-1 text-center text-gray-600 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      rows={3}
                      style={{ direction: "ltr" }}
                      autoFocus
                    />
                  )
                ) : (
                  <TagName
                    className={cn(
                      isHeading
                        ? "text-3xl font-bold text-gray-900 cursor-text p-2 rounded transition-all outline-none"
                        : "text-gray-600 cursor-text p-2 rounded transition-all outline-none",
                      hoveredHeaderElement === element.id
                        ? "border-2 border-dashed border-valasys-orange bg-gray-50"
                        : "border-2 border-transparent hover:bg-gray-50"
                    )}
                    onMouseEnter={() => setHoveredHeaderElement(element.id)}
                    onMouseLeave={() => setHoveredHeaderElement(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocalSelectedHeaderElement(element.id);
                      onSelect?.({ type: element.type, id: element.id });
                    }}
                  >
                    {element.text || fallbackText}
                  </TagName>
                )}
                {renderHeaderControls(element.id)}
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${block.properties.columns || 4}, 1fr)`,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "relative group transition-all rounded-lg p-4",
                isSelected(feature.id)
                  ? "border-2 border-solid border-valasys-orange bg-valasys-orange/5 shadow-lg shadow-valasys-orange/20"
                  : isCardHovered(feature.id)
                  ? "border-2 border-dashed border-valasys-orange bg-gray-50"
                  : "border-2 border-transparent"
              )}
              style={getFeatureStyles(feature)}
              onMouseEnter={() => setHoveredCardId(feature.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={(e) => {
                e.stopPropagation();
                const newSelectedId = selectedFeatureId === feature.id ? null : feature.id;
                setSelectedFeatureId(newSelectedId);
                setLocalSelectedHeaderElement(null);
                onSelect?.(newSelectedId ? { type: "feature", id: newSelectedId } : null);
              }}
            >
              {/* Icon */}
              <div
                ref={(el) => {
                  if (el) {
                    featureElementRefsMap.current[`${feature.id}-icon`] = el;
                    // Only update DOM content if not currently editing this element
                    if (editingFeatureElementId !== `${feature.id}-icon`) {
                      if (el.textContent !== feature.icon) {
                        el.textContent = feature.icon;
                      }
                    }
                  }
                }}
                dir="ltr"
                style={{ direction: "ltr" }}
                className={cn(
                  "text-4xl mb-4 cursor-text p-2 rounded transition-all outline-none",
                  isSelected(feature.id)
                    ? "border-2 border-solid border-valasys-orange"
                    : isElementHovered(feature.id, "icon")
                    ? "border-2 border-dashed border-valasys-orange bg-gray-50"
                    : "border-2 border-transparent hover:bg-gray-50"
                )}
                contentEditable
                suppressContentEditableWarning
                onClick={(e) => {
                  e.stopPropagation();
                  const newSelectedId = selectedFeatureId === feature.id ? null : feature.id;
                  setSelectedFeatureId(newSelectedId);
                  setLocalSelectedHeaderElement(null);
                  onSelect?.(newSelectedId ? { type: "feature", id: newSelectedId } : null);
                }}
                onInput={(e) => {
                  const newText = e.currentTarget.textContent || "";
                  handleUpdateFeature(feature.id, { icon: newText });
                  setEditingFeatureElementId(`${feature.id}-icon`);
                  onSelect?.({ type: "feature", id: feature.id });
                }}
                onBlur={(e) => {
                  const newText = e.currentTarget.textContent || "";
                  handleUpdateFeature(feature.id, { icon: newText });
                  setEditingFeatureElementId(null);
                }}
                onFocus={(e) => {
                  setEditingFeatureElementId(`${feature.id}-icon`);
                  setSelectedFeatureId(feature.id);
                  onSelect?.({ type: "feature", id: feature.id });
                }}
                onMouseEnter={() => setHoveredElement({ featureId: feature.id, element: "icon" })}
                onMouseLeave={() => setHoveredElement(null)}
              />

              {/* Title */}
              <h3
                ref={(el) => {
                  if (el) {
                    featureElementRefsMap.current[`${feature.id}-title`] = el;
                    // Only update DOM content if not currently editing this element
                    if (editingFeatureElementId !== `${feature.id}-title`) {
                      if (el.textContent !== feature.title) {
                        el.textContent = feature.title;
                      }
                    }
                  }
                }}
                dir="ltr"
                style={{ direction: "ltr" }}
                className={cn(
                  "text-lg font-semibold text-gray-900 mb-2 cursor-text p-2 rounded transition-all outline-none",
                  isSelected(feature.id)
                    ? "border-2 border-solid border-valasys-orange"
                    : isElementHovered(feature.id, "title")
                    ? "border-2 border-dashed border-valasys-orange bg-gray-50"
                    : "border-2 border-transparent hover:bg-gray-50"
                )}
                contentEditable
                suppressContentEditableWarning
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedFeatureId !== feature.id) {
                    setSelectedFeatureId(feature.id);
                    setLocalSelectedHeaderElement(null);
                    onSelect?.({ type: "feature", id: feature.id });
                  }
                }}
                onInput={(e) => {
                  const newText = e.currentTarget.textContent || "";
                  handleUpdateFeature(feature.id, { title: newText });
                  setEditingFeatureElementId(`${feature.id}-title`);
                  onSelect?.({ type: "feature", id: feature.id });
                }}
                onBlur={(e) => {
                  const newText = e.currentTarget.textContent || "";
                  handleUpdateFeature(feature.id, { title: newText });
                  setEditingFeatureElementId(null);
                }}
                onFocus={(e) => {
                  setEditingFeatureElementId(`${feature.id}-title`);
                  setSelectedFeatureId(feature.id);
                  onSelect?.({ type: "feature", id: feature.id });
                }}
                onMouseEnter={() => setHoveredElement({ featureId: feature.id, element: "title" })}
                onMouseLeave={() => setHoveredElement(null)}
              />

              {/* Description */}
              <p
                ref={(el) => {
                  if (el) {
                    featureElementRefsMap.current[`${feature.id}-description`] = el;
                    // Only update DOM content if not currently editing this element
                    if (editingFeatureElementId !== `${feature.id}-description`) {
                      if (el.textContent !== feature.description) {
                        el.textContent = feature.description;
                      }
                    }
                  }
                }}
                dir="ltr"
                style={{ direction: "ltr" }}
                className={cn(
                  "text-sm text-gray-600 cursor-text p-2 rounded transition-all outline-none",
                  isSelected(feature.id)
                    ? "border-2 border-solid border-valasys-orange"
                    : isElementHovered(feature.id, "description")
                    ? "border-2 border-dashed border-valasys-orange bg-gray-50"
                    : "border-2 border-transparent hover:bg-gray-50"
                )}
                contentEditable
                suppressContentEditableWarning
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedFeatureId !== feature.id) {
                    setSelectedFeatureId(feature.id);
                    setLocalSelectedHeaderElement(null);
                    onSelect?.({ type: "feature", id: feature.id });
                  }
                }}
                onInput={(e) => {
                  const newText = e.currentTarget.textContent || "";
                  handleUpdateFeature(feature.id, { description: newText });
                  setEditingFeatureElementId(`${feature.id}-description`);
                  onSelect?.({ type: "feature", id: feature.id });
                }}
                onBlur={(e) => {
                  const newText = e.currentTarget.textContent || "";
                  handleUpdateFeature(feature.id, { description: newText });
                  setEditingFeatureElementId(null);
                }}
                onFocus={(e) => {
                  setEditingFeatureElementId(`${feature.id}-description`);
                  setSelectedFeatureId(feature.id);
                  onSelect?.({ type: "feature", id: feature.id });
                }}
                onMouseEnter={() => setHoveredElement({ featureId: feature.id, element: "description" })}
                onMouseLeave={() => setHoveredElement(null)}
              />

              {renderControls(feature.id)}
            </div>
          ))}
        </div>

        {/* Image Section */}
        {imageUrl && (
          <div className="mt-8 w-full">
            <img
              src={imageUrl}
              alt="Feature showcase"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};
