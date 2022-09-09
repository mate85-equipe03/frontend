import React from "react"

export default function (props) {
  return (
    <div className="Auth-form-container">
    <img src="../src/assets/logo.png" alt="" />
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Matrícula</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Digite sua matrícula"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="button">
              Logar
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Não tem conta? <a href="#">Cadastre-se</a>
          </p>
          <p className="forgot-password text-right mt-2">
            <a href="#">Esquecia a senha</a>
          </p>
        </div>
      </form>
    </div>
  )
}