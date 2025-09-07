import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Users, TrendingUp, Plus, Search, Filter, Image } from "lucide-react";

const SocialModule = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const posts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        role: "Product Designer",
        avatar: "/placeholder.svg",
        initials: "SJ"
      },
      content: "Just wrapped up an amazing design session! Our new user onboarding flow is going to be a game-changer. Can't wait to share the results with the team. 🎨✨",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["design", "ux", "teamwork"]
    },
    {
      id: 2,
      author: {
        name: "Mike Chen",
        role: "Software Engineer",
        avatar: "/placeholder.svg",
        initials: "MC"
      },
      content: "Exciting news! We've successfully deployed the new API endpoints. Performance improvements are already showing a 40% reduction in response times. Great teamwork everyone! 🚀",
      timestamp: "4 hours ago",
      likes: 31,
      comments: 12,
      shares: 7,
      tags: ["development", "api", "performance"]
    },
    {
      id: 3,
      author: {
        name: "Emily Rodriguez",
        role: "Marketing Manager",
        avatar: "/placeholder.svg",
        initials: "ER"
      },
      content: "Our latest campaign exceeded expectations! 📈 Looking forward to sharing the detailed results in tomorrow's all-hands meeting. Thanks to everyone who contributed ideas during our brainstorming sessions.",
      timestamp: "1 day ago",
      likes: 18,
      comments: 5,
      shares: 2,
      tags: ["marketing", "success", "collaboration"]
    }
  ];

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
            {posts.length} new updates
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search posts..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-social hover:bg-social/90"
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
                    <Button className="bg-social hover:bg-social/90">
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback className="bg-social text-white">
                        {post.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{post.author.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {post.author.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                  {/* Tags */}
                  <div className="flex space-x-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                        <Heart className="w-4 h-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                        <Share2 className="w-4 h-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Connections</span>
                  <span className="font-semibold">847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Posts this month</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Profile views</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Engagement rate</span>
                  <span className="font-semibold text-social">+24%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialModule;