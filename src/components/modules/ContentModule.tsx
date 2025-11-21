import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, Video, FileText, Image, Play, Download, Eye, Share2, Search, Filter, Plus, BarChart3, Trash2 } from "lucide-react";
import { useStore, ContentItem } from "@/lib/store";

const ContentModule = () => {
  const { contentItems, addContentItem, deleteContentItem } = useStore();
  const [showUpload, setShowUpload] = useState(false);

  // Upload state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadType, setUploadType] = useState<'video' | 'document'>('document');
  const [uploadUrl, setUploadUrl] = useState("");

  const handleUpload = () => {
    if (!uploadTitle) return;

    const newItem: ContentItem = {
      id: crypto.randomUUID(),
      title: uploadTitle,
      type: uploadType,
      url: uploadUrl || "#",
      uploadDate: new Date().toISOString().split('T')[0]
    };

    addContentItem(newItem);
    setShowUpload(false);
    setUploadTitle("");
    setUploadUrl("");
    setUploadType("document");
  };

  const stats = {
    totalFiles: contentItems.length,
    totalSize: "2.4 GB", // Mock
    monthlyViews: 1247, // Mock
    monthlyDownloads: 189 // Mock
  };

  if (showUpload) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setShowUpload(false)}>
            ← Back to Content
          </Button>
          <Button className="bg-content hover:bg-content/90 text-white" onClick={handleUpload}>
            Save Content
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Content</CardTitle>
            <CardDescription>Share videos, documents, images, and more with your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-content transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-content rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Drop files here or click to browse</h3>
              <p className="text-muted-foreground mb-4">Supports videos, documents, images, and presentations</p>
              <Button variant="outline">
                Browse Files
              </Button>
            </div>

            {/* Content Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Title</label>
                  <Input
                    placeholder="Enter content title..."
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">URL (Optional)</label>
                  <Input
                    placeholder="External URL..."
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Type</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as 'video' | 'document')}
                  >
                    <option value="document">Document</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Content Studio</h2>
          <Badge className="bg-content text-white">
            {stats.totalFiles} files
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search content..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            className="bg-content hover:bg-content/90 text-white"
            onClick={() => setShowUpload(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{stats.totalFiles}</p>
              </div>
              <div className="w-10 h-10 bg-content rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{stats.totalSize}</p>
              </div>
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Views</p>
                <p className="text-2xl font-bold">{stats.monthlyViews}</p>
              </div>
              <div className="w-10 h-10 bg-social rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-2xl font-bold">{stats.monthlyDownloads}</p>
              </div>
              <div className="w-10 h-10 bg-meeting rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contentItems.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            <p>No content uploaded yet.</p>
          </div>
        ) : (
          contentItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-secondary rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-content/20 to-content/5 flex items-center justify-center">
                    {item.type === 'video' && <Video className="w-12 h-12 text-content" />}
                    {item.type === 'document' && <FileText className="w-12 h-12 text-notes" />}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-100 text-green-800">
                      Published
                    </Badge>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">{item.title}</h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{item.uploadDate}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteContentItem(item.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentModule;