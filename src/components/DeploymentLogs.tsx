
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";

interface DeploymentLogsProps {
  logs: string[];
  isDeploying: boolean;
}

const DeploymentLogs = ({ logs, isDeploying }: DeploymentLogsProps) => {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Terminal className="w-5 h-5" />
          Deployment Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-900 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto border border-slate-700">
          {logs.length === 0 ? (
            <div className="text-slate-400 font-mono text-sm">
              {isDeploying ? "Initializing deployment..." : "No deployment logs yet. Start a deployment to see logs here."}
            </div>
          ) : (
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="text-sm font-mono text-slate-200 animate-in slide-in-from-left-2 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-slate-500 mr-2">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  {log}
                </div>
              ))}
              {isDeploying && (
                <div className="flex items-center gap-2 text-blue-400 font-mono text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          )}
          <div ref={logsEndRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentLogs;
