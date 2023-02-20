
export interface Body {
    [x: string]: string | number
};


export interface Params {
    [x: string]: string
};

export type WithdrawBody = {
	amount: number,
	msid: string,
	pin: number
};

export type PinBody = {
	pin: string,
	msid: string
};

