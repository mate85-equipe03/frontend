import React from "react";
import logo from "../assets/posgress-vertical.png";

export default function Login() {
  return (
    <div className="auth-form-container">
      <img src={logo} alt="Logo do Sistema" />
      <form className="auth-form" id="form-login">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label id="form" htmlFor="matricula">
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
            <label id="form" htmlFor="senha">
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
            <button type="submit" className="button-login">
              Logar
            </button>
          </div>
          <p id="cadastro" className="forgot-password text-right mt-2">
            Não tem conta?{" "}
            <a className="link-login" href="#cadastro">
              Cadastre-se
            </a>
          </p>
          <p id="esqueci" className="forgot-password text-right mt-2">
            <a className="link-login" href="#esqueci">
              Esqueci a senha
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
