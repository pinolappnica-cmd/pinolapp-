// Definición de errores personalizados para la app

export class AuthError extends Error {
  constructor(message: string = "Error de autenticación") {
    super(message);
    this.name = "AuthError";
  }
}

export class ValidationError extends Error {
  constructor(message: string = "Datos inválidos") {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Recurso no encontrado") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class PermissionError extends Error {
  constructor(message: string = "No tienes permisos para esta acción") {
    super(message);
    this.name = "PermissionError";
  }
}
