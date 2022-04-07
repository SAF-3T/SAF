using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ITipoCargaRepository
    {
        public void Cadastrar(TipoCarga cargaNova);
        public List<TipoCarga> ListarTodas();

        public void Deletar(int id);

        public TipoCarga BuscarPorId(int id);
    }
}
