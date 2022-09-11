import React from "react";
import pgcomp from "../assets/pgcomp-horizontal.png";

function Footer() {
  return (
    <footer className="footer">
      <div id="contato-ufba">
        <div>
          <strong>INSTITUTO DE COMPUTAÇÃO</strong>
        </div>
        <div>
          Avenida Milton Santos, s/n - Campus de Ondina, PAF 2 - Salvador -
          Bahia, CEP 40.170-110
        </div>
        <div>
          E-mail: <a href="mailto:ceapg-ic@ufba.br">ceapg-ic@ufba.br</a>
        </div>
      </div>
      <div>
        <a href="https://pgcomp.ufba.br/" target="_blank" rel="noreferrer">
          <img src={pgcomp} alt="PGCOMP UFBA" />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
