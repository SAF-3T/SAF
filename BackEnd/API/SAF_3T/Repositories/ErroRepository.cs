using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class ErroRepository : IErroRepository
    {
        SAFContext ctx = new SAFContext();
        public void Cadastrar(TabelaErro novoErro)
        {
            ctx.TabelaErros.Add(novoErro);
            ctx.SaveChanges();
        }

        public void Deletar(int idRecebido)
        {
            ctx.TabelaErros.Remove(BuscarPorId(idRecebido));
            ctx.SaveChanges();
        }

        public List<TabelaErro> ListarMinhas(int idCheckList)
        {
            throw new NotImplementedException();
        }

        public TabelaErro BuscarPorId(int idRecebido)
        {
            return ctx.TabelaErros.Find(idRecebido);
        }

        public List<TabelaErro> ListarTodos()
        {
            return ctx.TabelaErros.ToList();
        }
    }
}
