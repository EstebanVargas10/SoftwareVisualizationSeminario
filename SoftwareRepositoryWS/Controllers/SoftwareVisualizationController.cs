using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SoftwareRepositoryWS.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace SoftwareRepositoryWS.Controllers
{
    public class SoftwareVisualizationController : ApiController
    {

        // GET: api/SoftwareVisualization
        [Route("api/SoftwareVisualization/GetAllPackageRevision")]
        [HttpGet]
        public IHttpActionResult GetAllPackageRevision(string projectlongId)
        {
            DataTable response = new DataTable();
            try
            {
                SoftwareVisualization pr = new SoftwareVisualization();
                response = pr.uspGetAllPackageRevision(projectlongId);

                if (response !=  null && response.Rows.Count > 0)
                {
                    
                        //Serializo el objecto a Json
                        string serial = JsonConvert.SerializeObject(response, Formatting.Indented);

                        //Agrego Object "resultado" a la respuesta
                        JArray result = JArray.Parse(serial);
                        JObject responseJson = new JObject(new JProperty("resultado", result));

                        return Ok(responseJson);
                                                     
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las revisiones de los paquetes " + ex.ToString());

            }
           
        }



        // GET: api/SoftwareVisualization
        [Route("api/SoftwareVisualization/GetAllProjects")]
        [HttpGet]
        public IHttpActionResult GetAllProjects()
        {
            DataTable response = new DataTable();
            try
            {
                SoftwareVisualization pr = new SoftwareVisualization();
                response = pr.uspGetAllProjects();

                if (response != null && response.Rows.Count > 0)
                {

                    //Serializo el objecto a Json
                    string serial = JsonConvert.SerializeObject(response, Formatting.Indented);

                    //Agrego Object "resultado" a la respuesta
                    JArray result = JArray.Parse(serial);
                    JObject responseJson = new JObject(new JProperty("resultado", result));

                    return Ok(responseJson);

                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los proyectos " + ex.ToString());

            }

        }



        // GET: api/SoftwareVisualization
        [Route("api/SoftwareVisualization/GetPackagesByRevision")]
        [HttpGet]
        public IHttpActionResult GetPackagesByRevision(string revisionId)
        {
            DataTable response = new DataTable();
            try
            {
                SoftwareVisualization pr = new SoftwareVisualization();
                response = pr.uspGetPackagesbyRevision(revisionId);

                if (response != null && response.Rows.Count > 0)
                {

                    //Serializo el objecto a Json
                    string serial = JsonConvert.SerializeObject(response, Formatting.Indented);

                    //Agrego Object "resultado" a la respuesta
                    JArray result = JArray.Parse(serial);
                    JObject responseJson = new JObject(new JProperty("resultado", result));

                    return Ok(responseJson);

                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los paquetes por revisión" + ex.ToString());

            }

        }



        // GET: api/SoftwareVisualization
        [Route("api/SoftwareVisualization/uspGetFilesByPackage")]
        [HttpGet]
        public IHttpActionResult uspGetFilesByPackage(string packagelongId)
        {
            DataTable response = new DataTable();
            try
            {
                SoftwareVisualization pr = new SoftwareVisualization();
                response = pr.uspGetFilesByPackage(packagelongId);

                if (response != null && response.Rows.Count > 0)
                {

                    //Serializo el objecto a Json
                    string serial = JsonConvert.SerializeObject(response, Formatting.Indented);

                    //Agrego Object "resultado" a la respuesta
                    JArray result = JArray.Parse(serial);
                    JObject responseJson = new JObject(new JProperty("resultado", result));

                    return Ok(responseJson);

                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los Files por paquete" + ex.ToString());

            }

        }
    }
}
