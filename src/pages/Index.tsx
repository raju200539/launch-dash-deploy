import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import DeploymentLogs from "@/components/DeploymentLogs";
import { Rocket, Github, Server } from "lucide-react";

const Index = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [deploymentType, setDeploymentType] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const { toast } = useToast();

  const handleDeploy = async () => {
    if (!repoUrl || !deploymentType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before deploying.",
        variant: "destructive",
      });
      return;
    }

    setIsDeploying(true);
    setDeploymentStatus("deploying");
    setLogs(["🚀 Starting deployment..."]);

    try {
      const response = await fetch("http://35.173.213.192:3001/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl, type: deploymentType }),
      });

      const result = await response.json();

      if (result.status === "success") {
        const lines = result.log.split("\n");
        for (let line of lines) {
          setLogs((prev) => [...prev, line]);
          await new Promise((r) => setTimeout(r, 200));
        }

        setDeploymentStatus("success");
        toast({
          title: "Deployment Successful! 🎉",
          description: "Your application has been deployed successfully.",
        });
      } else {
        setLogs([`❌ Deployment failed: ${result.error}`]);
        setDeploymentStatus("error");
        toast({
          title: "Deployment Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setLogs([`❌ Error: ${error.message}`]);
      setDeploymentStatus("error");
      toast({
        title: "Deployment Failed",
        description: "Could not connect to backend.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusBadge = () => {
    switch (deploymentStatus) {
      case "deploying":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Deploying...</Badge>;
      case "success":
        return <Badge className="bg-green-600 hover:bg-green-700">Success</Badge>;
      case "error":
        return <Badge className="bg-red-600 hover:bg-red-700">Failed</Badge>;
      default:
        return <Badge variant="outline">Ready</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DeployBot
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Deploy your GitHub repositories to EC2 with a single click. Support for Docker applications and static sites.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Deployment Form */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Github className="w-5 h-5" />
                Deploy Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  GitHub Repository URL
                </label>
                <Input
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  disabled={isDeploying}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Deployment Type
                </label>
                <Select value={deploymentType} onValueChange={setDeploymentType} disabled={isDeploying}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-white focus:border-blue-500">
                    <SelectValue placeholder="Select deployment type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="docker" className="text-white hover:bg-slate-700">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4" />
                        Docker App
                      </div>
                    </SelectItem>
                    <SelectItem value="static" className="text-white hover:bg-slate-700">
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        Static Site
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-slate-600" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">Status:</span>
                  {getStatusBadge()}
                </div>
                <Button
                  onClick={handleDeploy}
                  disabled={isDeploying || !repoUrl || !deploymentType}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8"
                >
                  {isDeploying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Deployment Logs */}
          <DeploymentLogs logs={logs} isDeploying={isDeploying} />
        </div>
      </div>
    </div>
  );
};

export default Index;
