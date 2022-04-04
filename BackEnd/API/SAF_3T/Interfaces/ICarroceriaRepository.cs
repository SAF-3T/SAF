using SAF_3T.Domains;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ICarroceriaRepository
    {
        List<Carroceria> Listar();

        Carroceria BuscarPorId(int IdCarroceria);
        void Cadastrar(Carroceria novaCarroceria);

        void Deletar(int id);
    }
}