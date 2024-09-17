import { Context } from "hono";
import { pingCheck } from "./ping";

type HealthCheck = {
  uptime: number,
  message: string,
  status: number,
  ping: { alive: boolean, time: number | "unknown" },
  timestamp: Date;
}

export const healthcheck = async (c: Context) => {
  const healthcheckData: HealthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    status: 200,
    ping: { alive: false, time: "unknown" },
    timestamp: new Date(),
  };

  try {
    const url = String(process.env.DEPLOY_URL) || 'localhost';
    healthcheckData.ping = await pingCheck(url);
    return c.json(healthcheckData);
  } catch (e) {
    const error = e as Error;

    healthcheckData.message = error?.message || 'Internal server error occured';
    healthcheckData.status = 503;
    return c.json(healthcheckData);
  }
}
