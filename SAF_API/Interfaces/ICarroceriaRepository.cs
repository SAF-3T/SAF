using SAF_3T.Domains;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ICarroceriaRepository
    {
        List<Carrocerium> Listar();
        List<Carrocerium> ListarCarroceriasSemUso();
        Carrocerium BuscarPorId(int IdCarroceria);
        void Cadastrar(Carrocerium novaCarroceria);
        void AlterarTipoCarga(int idRecebido, Carrocerium atualizaCarroceria);
        void AlterarConteudo(int idRecebido, Carrocerium atualizaCarroceria);
        void AtualizarCarroceria(int idRecebido, Carrocerium atualizaCarroceria);
        void Deletar(int id);
    }
}