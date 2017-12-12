using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace SoftwareRepositoryWS.Models
{

    public class SoftwareVisualization
    {
        string connStr;
        MySqlConnection cnn;
        MySqlCommand cmd;
        public SoftwareVisualization()
        {
            connStr = ConfigurationManager.ConnectionStrings["conexion"].ToString();
            cnn = new MySqlConnection(connStr);
        }

        public DataTable uspGetAllPackageRevision(string projectlongId)
        {
            DataTable dt = new DataTable();
            cmd = new MySqlCommand("uspGetAllPackageRevision");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@projectlongId", projectlongId);
            cmd.Connection = cnn;

            MySqlDataAdapter adap = new MySqlDataAdapter(cmd);
            if (cnn.State != ConnectionState.Open ||
                cnn.State == ConnectionState.Broken ||
                cnn.State != ConnectionState.Connecting ||
                cnn.State != ConnectionState.Executing ||
                cnn.State != ConnectionState.Fetching)
                try
                {
                    adap.Fill(dt);
                    return dt;
                }
                catch (Exception ex)
                {
                    if (cnn.State != ConnectionState.Closed)
                    {
                        cnn.Close();  
                    }

                    DataColumn column;
                    DataRow row;

                    column = new DataColumn();
                    column.DataType = System.Type.GetType("System.String");
                    column.ColumnName = "Exception";
                    dt.Columns.Add(column);

                    // Create new DataRow object and add to DataTable.
                    row = dt.NewRow();
                    row["Exception"] = ex.ToString();
                    dt.Rows.Add(row);
                    return dt;

                }
            return dt;
        }
        
        public DataTable uspGetAllProjects()
        {
            DataTable dt = new DataTable();
            cmd = new MySqlCommand("uspGetAllProjects");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = cnn;

            MySqlDataAdapter adap = new MySqlDataAdapter(cmd);
            if (cnn.State != ConnectionState.Open ||
                cnn.State == ConnectionState.Broken ||
                cnn.State != ConnectionState.Connecting ||
                cnn.State != ConnectionState.Executing ||
                cnn.State != ConnectionState.Fetching)
                try
                {
                    adap.Fill(dt);
                    return dt;
                }
                catch (Exception ex)
                {
                    if (cnn.State != ConnectionState.Closed)
                    {
                        cnn.Close();
                    }

                    DataColumn column;
                    DataRow row;

                    column = new DataColumn();
                    column.DataType = System.Type.GetType("System.String");
                    column.ColumnName = "Exception";
                    dt.Columns.Add(column);

                    // Create new DataRow object and add to DataTable.
                    row = dt.NewRow();
                    row["Exception"] = ex.ToString();
                    dt.Rows.Add(row);
                    return dt;
                }
            return dt;
        }

        public DataTable uspGetPackagesbyRevision(string revisionId)
        {
            DataTable dt = new DataTable();
            cmd = new MySqlCommand("uspGetPackagesbyRevision");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@revisionId", revisionId);
            cmd.Connection = cnn;

            MySqlDataAdapter adap = new MySqlDataAdapter(cmd);
            if (cnn.State != ConnectionState.Open ||
                cnn.State == ConnectionState.Broken ||
                cnn.State != ConnectionState.Connecting ||
                cnn.State != ConnectionState.Executing ||
                cnn.State != ConnectionState.Fetching)
                try
                {
                    adap.Fill(dt);
                    return dt;
                }
                catch (Exception ex)
                {
                    if (cnn.State != ConnectionState.Closed)
                    {
                        cnn.Close();
                    }

                    DataColumn column;
                    DataRow row;

                    column = new DataColumn();
                    column.DataType = System.Type.GetType("System.String");
                    column.ColumnName = "Exception";
                    dt.Columns.Add(column);

                    // Create new DataRow object and add to DataTable.
                    row = dt.NewRow();
                    row["Exception"] = ex.ToString();
                    dt.Rows.Add(row);
                    return dt;

                }
            return dt;
        }

        public DataTable uspGetFilesByPackage(string packagelongId)
        {
            DataTable dt = new DataTable();
            cmd = new MySqlCommand("uspGetFilesByPackage");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@packagelongId", packagelongId);
            cmd.Connection = cnn;

            MySqlDataAdapter adap = new MySqlDataAdapter(cmd);
            if (cnn.State != ConnectionState.Open ||
                cnn.State == ConnectionState.Broken ||
                cnn.State != ConnectionState.Connecting ||
                cnn.State != ConnectionState.Executing ||
                cnn.State != ConnectionState.Fetching)
                try
                {
                    adap.Fill(dt);
                    return dt;
                }
                catch (Exception ex)
                {
                    if (cnn.State != ConnectionState.Closed)
                    {
                        cnn.Close();
                    }

                    DataColumn column;
                    DataRow row;

                    column = new DataColumn();
                    column.DataType = System.Type.GetType("System.String");
                    column.ColumnName = "Exception";
                    dt.Columns.Add(column);

                    // Create new DataRow object and add to DataTable.
                    row = dt.NewRow();
                    row["Exception"] = ex.ToString();
                    dt.Rows.Add(row);
                    return dt;

                }
            return dt;
        }
    }
}