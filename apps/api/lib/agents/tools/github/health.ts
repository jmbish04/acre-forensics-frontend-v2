import { HealthResult } from '../types';
import { Env } from "../../../env";
import { getOctokit } from "./core";

export async function checkHealth(env: Env): Promise<HealthResult> {
    const start = Date.now();

    if (!env.GITHUB_TOKEN) {
        return {
            tool: 'github',
            status: 'unhealthy',
            error: 'GITHUB_TOKEN is missing',
            requiresAuth: true
        };
    }

    try {
        const octokit = getOctokit(env);
        // lightweight API call to verify token
        await octokit.rest.users.getAuthenticated();

        const latency = Date.now() - start;

        return {
            tool: 'github',
            status: 'healthy',
            latencyMs: latency,
            requiresAuth: true
        };
    } catch (err) {
        return {
            tool: 'github',
            status: 'unhealthy',
            error: (err as Error).message,
            requiresAuth: true
        };
    }
}
