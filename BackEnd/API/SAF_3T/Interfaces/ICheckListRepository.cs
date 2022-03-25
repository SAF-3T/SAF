﻿using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    public interface ICheckListRepository
    {
        void Cadastrar(CheckList novaChecklist);
        void Deletar(int idRecebido);
        List<CheckList> ListarTodas();
        CheckList BuscaPorId(int idRecebido);
        List<CheckList> ListarMinhas(int idUsuario);
    }
}