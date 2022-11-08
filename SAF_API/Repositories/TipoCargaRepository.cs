using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class TipoCargaRepository : ITipoCargaRepository
    {
        private SAFContext ctx = new SAFContext();

        public TipoCarga BuscarPorId(int id)
        {
            TipoCarga cargaEncontrada = ctx.TipoCargas.FirstOrDefault(c => c.IdTipoCarga == id);
            return cargaEncontrada; 
        }

        public void Deletar(int id)
        {
            var encontrar = ctx.TipoCargas.FirstOrDefault(c => c.IdTipoCarga == id);

            ctx.TipoCargas.Remove(encontrar);

            ctx.SaveChanges();
        }

        public List<TipoCarga> ListarTodas()
        {
            return ctx.TipoCargas.ToList();
        }

        public bool VerificaDisponibilidade(string carga)
        {
            TipoCarga cargaBuscada = ctx.TipoCargas.FirstOrDefault(c => c.NomeTipoCarga == carga);
            if (cargaBuscada == null)
            {
                return true;
            }
            return false;
        }

        void ITipoCargaRepository.Cadastrar(TipoCarga cargaNova)
        {
            ctx.TipoCargas.Add(cargaNova);
            ctx.SaveChanges();
        }
    }
}
