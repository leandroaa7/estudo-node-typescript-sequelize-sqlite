import { Response } from "express";

export default (err: Error, res: Response) => {
    if (process.env.NODE_ENV == "development") {
        res.status(500).json({ name: err.name, message: err.message, stack: err.stack });
    } else {
        res.status(500).json({ name: err.name, message: err.message });

    }
}