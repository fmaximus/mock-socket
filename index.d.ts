// Type definitions for Mock Socket 8.X+
// Project: Mock Socket
// Definitions by: Travis Hoover <https://github.com/thoov/mock-socket>

declare module 'mock-socket' {
  type Room = string;

  class EventTarget {
    listeners: any;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  }

  interface WebSocketCallbackMap {
    close: () => void;
    error: (err: Error) => void;
    message: (message: string | Blob | ArrayBuffer | ArrayBufferView) => void;
    open: () => void;
  }

  interface OpenEvent {
    type: string;
    target: WebSocket;
  }

  interface ErrorEvent {
    error: any;
    message: string;
    type: string;
    target: WebSocket;
  }

  interface CloseEvent {
    wasClean: boolean;
    code: number;
    reason: string;
    type: string;
    target: WebSocket;
  }

  type Data = string | Buffer | ArrayBuffer | Buffer[];
  interface MessageEvent {
    data: Data;
    type: string;
    target: WebSocket;
  }

  //
  // https://html.spec.whatwg.org/multipage/web-sockets.html#websocket
  //
  class WebSocket extends EventTarget {
    constructor(url?: string, protocols?: string|string[]);

    static readonly CONNECTING: 0;
    static readonly OPEN: 1;
    static readonly CLOSING: 2;
    static readonly CLOSED: 3;

    readonly url: string;

    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSING: 2;
    readonly CLOSED: 3;
    readonly readyState: number;
    readonly bufferedAmount: number;

    onopen: (event: OpenEvent) => void;
    onerror: (event: ErrorEvent) => void;
    onclose: (event: CloseEvent) => void;
    onmessage: (event: MessageEvent) => void;
    readonly extensions: string;
    readonly protocol: string;
    close(code?: number, reason?: string): void;

    binaryType: BinaryType;
    send(data: string | Blob | ArrayBuffer | ArrayBufferView): void;
    on<K extends keyof WebSocketCallbackMap>(type: K, callback: WebSocketCallbackMap[K]): void;
  }

  class Server extends EventTarget {
    constructor(url: string, options?: ServerOptions);

    readonly options?: ServerOptions;

    start(): void;
    stop(callback?: () => void): void;

    on(type: string, callback: (socket: WebSocket) => void): void;
    close(options?: CloseOptions): void;
    emit(event: string, data: any, options?: EmitOptions): void;

    clients(): WebSocket[];
    to(room: any, broadcaster: any, broadcastList?: object): ToReturnObject;
    in(any: any): ToReturnObject;
    simulate(event: string): void;

    public of(url: string): Server;
  }

  interface CloseOptions {
    code: number;
    reason: string;
    wasClean: boolean;
  }

  interface EmitOptions {
    websockets: WebSocket[];
  }

  interface ToReturnObject {
    to: (chainedRoom: any, chainedBroadcaster: any) => ToReturnObject;
    emit(event: Event, data: any): void;
  }

  interface ServerOptions {
    verifyClient?: () => boolean;
    selectProtocol?: (protocols: string[]) => string | null;
  }

    export interface Handshake {
        /**
         * The headers sent as part of the handshake
         */
        headers: object;
        /**
         * The date of creation (as string)
         */
        time: string;
        /**
         * The ip of the client
         */
        address: string;
        /**
         * Whether the connection is cross-domain
         */
        xdomain: boolean;
        /**
         * Whether the connection is secure
         */
        secure: boolean;
        /**
         * The date of creation (as unix timestamp)
         */
        issued: number;
        /**
         * The request URL string
         */
        url: string;
        /**
         * The query object
         */
        query: { [key:string]: string };
        /**
         * The auth object
         */
        auth: object;
    }

    class SocketIO extends EventTarget {
      id: string
      handshake: Handshake;
      constructor(url?: string, protocol?: string)
      close(): this
      disconnect(): this
      emit(ev: string, ...args: any[]): this;
      send(...args: any[]): this;
      on(event: string | symbol, listener: (...args: any[]) => void): this;
      off(event: string | symbol, listener: (...args: any[]) => void): this;
      join(rooms: Room | Array<Room>): Promise<void> | void;
      leave(room: string): Promise<void> | void;
      to(name: Room): this;
      in(name: Room): this;
      get broadcast(): this;
    }
}
