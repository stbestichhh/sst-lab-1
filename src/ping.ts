import * as ping from 'ping';

export const pingCheck = async (url: string) => {
  const pingResult = await ping.promise.probe(url);
  console.log(pingResult);
  return { alive: pingResult.alive, time: pingResult.time };
}
