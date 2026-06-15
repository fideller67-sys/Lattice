import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { GitPullRequest, Code2, AlertTriangle } from 'lucide-react';

export default function ConnectGithub() {
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    // Redirect to backend endpoint which will handle GitHub OAuth
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  return (
    <AuthLayout>
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Connect GitHub</h1>
        <p className="text-gray-400 text-sm">Automate your pull request and commit workflows.</p>
      </div>

      <div className="space-y-6 mb-10">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Code2 className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Code reviews</h3>
            <p className="text-xs text-gray-500">Automatically link PRs to tasks and surface review status inline.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1">
            <AlertTriangle className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Automate issues</h3>
            <p className="text-xs text-gray-500">Create and close issues directly from commit messages and branch events.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1">
            <GitPullRequest className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Branch specific rules</h3>
            <p className="text-xs text-gray-500">Set merge policies and status checks per branch across all repositories.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button 
          type="button" 
          onClick={() => navigate('/developer/dashboard')}
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          Skip
        </button>
        <button 
          onClick={handleContinue}
          className="bg-white hover:bg-gray-200 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
        >
          Authenticate with GitHub
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-16">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
      </div>
    </AuthLayout>
  );
}
