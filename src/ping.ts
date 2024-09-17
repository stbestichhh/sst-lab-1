import * as ping from 'ping';

export const pingCheck = async (url: string) => {
  const pingResult = await ping.promise.probe(url);
  return { alive: pingResult.alive, time: pingResult.time };
}
