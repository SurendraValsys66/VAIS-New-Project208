import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Sparkles, Loader, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface GeneratedLayout {
  title: string;
  subtitle: string;
  sections: Array<{
    id: string;
    type: string;
    title?: string;
    description?: string;
    content?: string;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  }>;
}

interface AIBuilderProps {
  onBack?: () => void;
  onGenerateComplete?: (layout: GeneratedLayout) => void;
}

export const AIBuilder: React.FC<AIBuilderProps> = ({ onBack, onGenerateComplete }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLayout, setGeneratedLayout] = useState<GeneratedLayout | null>(null);

  const handleGenerateLayout = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your landing page");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai-builder/generate-layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate layout");
      }

      const data = await response.json();
      setGeneratedLayout(data.data);
      setPrompt(""); // Clear prompt after successful generation
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating the layout");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseGenerated = () => {
    if (generatedLayout && onGenerateComplete) {
      onGenerateComplete(generatedLayout);
    }
  };

  const handleNewGeneration = () => {
    setGeneratedLayout(null);
    setError(null);
    setPrompt("");
  };

  if (generatedLayout) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-valasys-orange rounded-xl flex items-center justify-center text-white shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                Design Generated Successfully
              </h1>
              <p className="text-gray-500 mt-1">Your AI-powered landing page design is ready to use</p>
            </div>
            <Button
              onClick={onBack}
              variant="outline"
              className="rounded-2xl px-6 py-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>

          {/* Generated Design Preview */}
          <Card className="border border-gray-100 shadow-lg rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-valasys-orange/10 to-orange-100/50 border-b">
              <CardTitle className="text-2xl">{generatedLayout.title}</CardTitle>
              <CardDescription className="text-base mt-2">{generatedLayout.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-12 space-y-6">
              {generatedLayout.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-valasys-orange/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-valasys-orange text-white font-bold text-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 capitalize">{section.type}</h3>
                  </div>

                  {section.title && <h4 className="font-bold text-gray-900 mb-2">{section.title}</h4>}

                  {section.description && (
                    <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                  )}

                  {section.content && <p className="text-sm text-gray-700 mb-3 italic">{section.content}</p>}

                  {section.items && section.items.length > 0 && (
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-3 bg-white rounded-lg border border-gray-100">
                          <h5 className="font-semibold text-gray-900">{item.title}</h5>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center py-8">
            <Button
              onClick={handleNewGeneration}
              variant="outline"
              className="px-8 py-6 rounded-xl font-bold"
            >
              Generate Another
            </Button>
            <Button
              onClick={handleUseGenerated}
              className="px-8 py-6 rounded-xl font-bold bg-valasys-orange hover:bg-valasys-orange/90 text-white shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Use This Design
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-valasys-orange rounded-xl flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              AI Landing Page Builder
            </h1>
            <p className="text-gray-500 mt-1">
              Describe your landing page idea and let AI generate the perfect design structure for you
            </p>
          </div>
          {onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              className="rounded-2xl px-6 py-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          )}
        </div>

        {/* Main Card */}
        <Card className="border border-gray-100 shadow-lg rounded-3xl max-w-2xl mx-auto w-full">
          <CardHeader className="bg-gradient-to-r from-valasys-orange/10 to-orange-100/50 border-b">
            <CardTitle>Describe Your Landing Page</CardTitle>
            <CardDescription>
              Tell us about your business, product, or service and we'll create a tailored landing page design
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Your Idea</label>
              <Textarea
                placeholder="Example: A modern SaaS platform for project management with a professional design, featuring a hero section, features showcase, testimonials, and a call-to-action for sign-ups"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                className="min-h-24 rounded-xl border-gray-100 focus:ring-valasys-orange focus:border-valasys-orange resize-none"
              />
              <p className="text-xs text-gray-500">
                Be specific about your business type, target audience, and key features you want to highlight
              </p>
            </div>

            {/* Example Suggestions */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm font-semibold text-blue-900 mb-3">Need ideas? Try describing:</p>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Your industry/business type and main value proposition</li>
                <li>• Target audience and their main pain points</li>
                <li>• Key features or services you want to showcase</li>
                <li>• Desired tone (professional, creative, friendly, etc.)</li>
              </ul>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateLayout}
              disabled={isGenerating || !prompt.trim()}
              className={cn(
                "w-full py-6 rounded-xl font-bold text-base transition-all shadow-lg",
                isGenerating
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-valasys-orange hover:bg-valasys-orange/90 text-white shadow-valasys-orange/20"
              )}
            >
              {isGenerating ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Design...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Landing Page Design
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto w-full">
          <Card className="rounded-2xl border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Smart Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                AI analyzes your requirements and creates an optimal page structure with hero, features, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Fully Customizable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Edit every section, change colors, fonts, and content to match your brand perfectly.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ready to Publish</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Once happy with your design, publish directly or continue refining with our builder.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
