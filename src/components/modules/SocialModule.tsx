import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Users, TrendingUp, Plus, Search, Filter, Image } from "lucide-react";
import { useStore, SocialPost } from "@/lib/store";

const SocialModule = () => {
  const { socialPosts, addSocialPost, likePost } = useStore();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = () => {
    if (!newPostContent) return;

    const newPost: SocialPost = {
      id: crypto.randomUUID(),
      author: "You", // Mock current user
      content: newPostContent,
      likes: 0,
      timestamp: "Just now"
    };

    addSocialPost(newPost);
    setNewPostContent("");
    setShowCreatePost(false);
  };

  const trendingTopics = [
    { name: "#ProductLaunch", posts: 45 },
    { name: "#TeamBuilding", posts: 32 },
    { name: "#Innovation", posts: 28 },
    { name: "#RemoteWork", posts: 24 },
    { name: "#DesignThinking", posts: 19 }
  ];

  const suggestedConnections = [
    { name: "Alex Thompson", role: "UX Researcher", mutualConnections: 8 },
    { name: "Lisa Wang", role: "Data Scientist", mutualConnections: 12 },
    { name: "David Kumar", role: "Project Manager", mutualConnections: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Social Feed</h2>
          <Badge className="bg-social text-white">
            {socialPosts.length} new updates
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search posts..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            className="bg-social hover:bg-social/90 text-white"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          {showCreatePost && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create a New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind? Share your thoughts, achievements, or questions with the team..."
                  className="min-h-[120px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Image className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                    <Input placeholder="Add tags..." className="w-32" />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-social hover:bg-social/90 text-white" onClick={handleCreatePost}>
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts Feed */}
          <div className="space-y-6">
            {socialPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">No posts yet. Be the first to share something!</p>
            ) : (
              socialPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-social text-white">
                          {post.author.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{post.author}</h4>
                          <Badge variant="secondary" className="text-xs">
                            Team Member
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-red-500"
                          onClick={() => likePost(post.id)}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${post.likes > 0 ? 'fill-current text-red-500' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          0
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-social" />
                Trending
              </CardTitle>
              <CardDescription>Popular topics in your network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                    <span className="font-medium text-social">{topic.name}</span>
                    <span className="text-sm text-muted-foreground">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Suggested Connections
              </CardTitle>
              <CardDescription>People you might know</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedConnections.map((connection, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {connection.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{connection.name}</h5>
                      <p className="text-xs text-muted-foreground">{connection.role}</p>
                      <p className="text-xs text-muted-foreground">{connection.mutualConnections} mutual connections</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialModule;