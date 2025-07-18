export const emailPattern = new RegExp(
  '^[a-z0-9_%+-]+(?:\\.[a-z0-9_%+-]+)*@' + // Local part
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+' + // Domain labels
    '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$',
  'i', // Case-insensitive flag
);
