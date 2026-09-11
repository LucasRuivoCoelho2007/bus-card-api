import express from "npm:express";

export function errorMiddleware(
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const code = error?.code ?? 500;
  const message = error?.message ?? "Internal server error";

  if (code >= 400 && code < 600) {
    if (code === 401) {
      res.send_unauthorized(message);
      return;
    }

    res.status(code).json({
      status: error?.status ?? "ERROR",
      code,
      success: false,
      message,
    });

    return;
  }

  res.send_internalServerError("Internal server error");
}