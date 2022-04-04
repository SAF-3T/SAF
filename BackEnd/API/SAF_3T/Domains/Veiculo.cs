﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class Veiculo
    {
        public Veiculo()
        {
            CheckLists = new HashSet<CheckList>();
        }

        public int IdVeiculo { get; set; }
        public int IdUsuario { get; set; }
        public byte IdMarca { get; set; }
        public byte IdTipoVeiculo { get; set; }
        public string ImagemVeiculo { get; set; }
        public int IdCarroceria { get; set; }
        public string Placa { get; set; }
        public DateTime DataAquisicao { get; set; }

        public virtual Carroceria IdCarroceriaNavigation { get; set; }
        public virtual Marca IdMarcaNavigation { get; set; }
        public virtual TipoVeiculo IdTipoVeiculoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<CheckList> CheckLists { get; set; }
        public string IdTipoCarroceria { get; internal set; }
        public int IdTipoVeiculos { get; internal set; }
        public string IdMarcas { get; internal set; }
        public string IdUsuarios { get; internal set; }
        public string PlacaVeiculos { get; internal set; }
    }
}
