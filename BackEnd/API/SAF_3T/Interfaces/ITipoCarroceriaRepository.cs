using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ITipoCarroceriaRepository
    {
        List<TipoCarrocerium> Listar();

        TipoCarrocerium BuscarPorNomeCarroceria(string NomeTipoCarroceria);

        void Cadastrar(TipoCarrocerium novaCarroceria);

        void Deletar(int id);


    }
}
