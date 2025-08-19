import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: `${files.length} file(s) uploaded to RAG store`,
    });
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="bg-gradient-subtle border-border/50 shadow-glow-subtle transition-all duration-300 hover:shadow-glow">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-secondary">
            <Upload className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Upload Files</h2>
        </div>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-300">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept=".txt,.pdf,.doc,.docx,.md"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="bg-muted/50 border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Files
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Support: TXT, PDF, DOC, DOCX, MD
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Selected Files:</h4>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/30">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                onClick={handleUpload}
                className="w-full bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground font-medium shadow-lg hover:shadow-glow transition-all duration-300"
              >
                Upload to RAG Store
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}