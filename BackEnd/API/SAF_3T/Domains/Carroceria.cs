using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class Carroceria
    {
        internal int BuscarId;

        public Carroceria()
        {
            Veiculos = new HashSet<Veiculo>();
        }

        public int IdCarroceria { get; set; }
        public byte IdTipoCarga { get; set; }
        public byte IdTipoCarroceria { get; set; }
        public string Cubagem { get; set; }
        public string Peso { get; set; }

        public virtual TipoCarga IdTipoCargaNavigation { get; set; }
        public virtual TipoCarroceria IdTipoCarroceriaNavigation { get; set; }
        public virtual ICollection<Veiculo> Veiculos { get; set; }
        public string BuscarCubagem { get; internal set; }
        public string Buscarcubagem { get; internal set; }
        public string BuscarPeso { get; internal set; }
        public string BuscarTipoCarga { get; internal set; }
        public string BuscarTipoCarroceria { get; internal set; }
        public string NomeCarroceria { get; internal set; }
    }
}
