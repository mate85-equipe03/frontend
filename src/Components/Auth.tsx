import React from "react";

export default function Login() {
  return (
    <div className="auth-form-container">
      <img src="../src/assets/logo.png" alt="" />
      <form className="auth-form">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label htmlFor="matricula">
              Matrícula
              <input
                id="matricula"
                type="text"
                className="form-control mt-1"
                placeholder="Digite sua matrícula"
              />
            </label>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="senha">
              Password
              <input
                id="senha"
                type="password"
                className="form-control mt-1"
                placeholder="Digite sua senha"
              />
            </label>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="button">
              Logar
            </button>
          </div>
          <p id="cadastro" className="forgot-password text-right mt-2">
            Não tem conta? <a href="#cadastro">Cadastre-se</a>
          </p>
          <p id="esqueci" className="forgot-password text-right mt-2">
            <a href="#esqueci">Esqueci a senha</a>
          </p>
        </div>
      </form>
    </div>
  );
}
