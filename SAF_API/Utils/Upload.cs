using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace SAF_3T.Utils
{
    public class Upload
    {
        public static string RetornarExtensao(string nomeDoArquivo)
        {
            string[] dados = nomeDoArquivo.Split(".");
            return dados[dados.Length - 1];
        }
        public static void RemoverArquivo(string nomeDoArquivo)
        {
            var pasta = Path.Combine("StaticFiles", "Images");
            var caminho = Path.Combine(Directory.GetCurrentDirectory(), pasta);
            var caminhoCompleto = Path.Combine(caminho, nomeDoArquivo);

            File.Delete(caminhoCompleto);
        }

        internal static string UploadFile(object arquivo, string[] extensoesPermitidas)
        {
            throw new NotImplementedException();
        }

        public static bool ValidarExtensao(string[] extensoes, string nomeDoArquivo)
        {
            string[] dados = nomeDoArquivo.Split(".");
            string extensao = dados[dados.Length - 1];

            foreach (var item in extensoes)
            {
                if (extensao == item)
                {
                    return true;
                }
            }
            return false;
        }

        public static string UploadFile(IFormFile arquivo, string[] extensoesPermitidas)
        {
            try
            {
                var pasta = Path.Combine("StaticFiles", "Images");
                var caminho = Path.Combine(Directory.GetCurrentDirectory(), pasta);

                if (arquivo != null)
                {
                    if (arquivo.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(arquivo.ContentDisposition).FileName.Trim('"');

                        if (ValidarExtensao(extensoesPermitidas, fileName))
                        {
                            var extensao = RetornarExtensao(fileName);
                            var novoNome = $"{Guid.NewGuid()}.{extensao}";
                            var caminhoCompleto = Path.Combine(caminho, novoNome);

                            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                            {
                                arquivo.CopyTo(stream);
                            }

                            return novoNome;
                        }

                        return "Extensão não permitida";
                    }
                    }
                return "Sem arquivo";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
    }
}
