import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, Video, FileText, Image, Play, Download, Eye, Share2, Search, Filter, Plus, BarChart3 } from "lucide-react";

const ContentModule = () => {
  const [selectedContent, setSelectedContent] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const content = [
    {
      id: 1,
      title: "Product Demo Walkthrough",
      type: "video",
      thumbnail: "/placeholder.svg",
      duration: "12:34",
      size: "45 MB",
      uploadDate: "2 days ago",
      views: 124,
      downloads: 18,
      status: "published",
      tags: ["demo", "product", "walkthrough"]
    },
    {
      id: 2,
      title: "Q4 Financial Report",
      type: "document",
      thumbnail: "/placeholder.svg",
      pages: 24,
      size: "8.2 MB",
      uploadDate: "1 week ago",
      views: 89,
      downloads: 34,
      status: "published",
      tags: ["finance", "report", "quarterly"]
    },
    {
      id: 3,
      title: "Team Building Event Photos",
      type: "image",
      thumbnail: "/placeholder.svg",
      count: 48,
      size: "156 MB",
      uploadDate: "2 weeks ago",
      views: 267,
      downloads: 12,
      status: "published",
      tags: ["team", "event", "photos"]
    },
    {
      id: 4,
      title: "Client Presentation Draft",
      type: "document",
      thumbnail: "/placeholder.svg",
      pages: 18,
      size: "12.1 MB",
      uploadDate: "3 days ago",
      views: 45,
      downloads: 8,
      status: "draft",
      tags: ["presentation", "client", "draft"]
    }
  ];

  const stats = {
    totalFiles: 156,
    totalSize: "2.4 GB",
    monthlyViews: 1247,
    monthlyDownloads: 189
  };

  if (showUpload) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setShowUpload(false)}>
            ← Back to Content
          </Button>
          <Button className="bg-content hover:bg-content/90">
            Save Draft
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

            {/* Upload Progress */}
            <div className="space-y-4">
              <h4 className="font-medium">Uploading Files</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-secondary/30 rounded-lg">
                  <Video className="w-5 h-5 text-content" />
                  <div className="flex-1">
                    <p className="font-medium">presentation-final.mp4</p>
                    <Progress value={75} className="mt-1" />
                  </div>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-secondary/30 rounded-lg">
                  <FileText className="w-5 h-5 text-notes" />
                  <div className="flex-1">
                    <p className="font-medium">requirements-doc.pdf</p>
                    <Progress value={100} className="mt-1" />
                  </div>
                  <span className="text-sm text-green-600">Complete</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Title</label>
                  <Input placeholder="Enter content title..." />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Description</label>
                  <Input placeholder="Brief description..." />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Tags</label>
                  <Input placeholder="Add tags separated by commas..." />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Visibility</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>Public - Everyone can view</option>
                    <option>Team - Team members only</option>
                    <option>Private - Only me</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Category</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option>Presentations</option>
                    <option>Documents</option>
                    <option>Videos</option>
                    <option>Images</option>
                    <option>Other</option>
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search content..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-content hover:bg-content/90"
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
        {content.map((item) => (
          <Card key={item.id} className="group hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
            <CardContent className="p-0">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-secondary rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-content/20 to-content/5 flex items-center justify-center">
                  {item.type === 'video' && <Video className="w-12 h-12 text-content" />}
                  {item.type === 'document' && <FileText className="w-12 h-12 text-notes" />}
                  {item.type === 'image' && <Image className="w-12 h-12 text-social" />}
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {item.status}
                  </Badge>
                </div>

                {/* Type-specific info */}
                <div className="absolute bottom-2 left-2">
                  {item.type === 'video' && (
                    <Badge variant="secondary" className="text-xs">
                      {item.duration}
                    </Badge>
                  )}
                  {item.type === 'document' && (
                    <Badge variant="secondary" className="text-xs">
                      {item.pages} pages
                    </Badge>
                  )}
                  {item.type === 'image' && (
                    <Badge variant="secondary" className="text-xs">
                      {item.count} photos
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h4 className="font-semibold mb-2 line-clamp-2">{item.title}</h4>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span>{item.uploadDate}</span>
                  <span>{item.size}</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 2} more
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {item.views}
                  </span>
                  <span className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {item.downloads}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Play className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentModule;