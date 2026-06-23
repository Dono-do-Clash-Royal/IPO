import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = 'https://turbo-zebra-wrr4rrpr4wjrhg749-3000.app.github.dev';

export function ClienteForm({ modo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codcli: '',
    nome: '',
    morada: '',
    nif: '',
  });
  const [loading, setLoading] = useState(modo !== 'create');
  const [mensagemErro, setMensagemErro] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(null);

  useEffect(() => {
    if (modo === 'create') {
      setLoading(false);
    } else {
      fetchCliente();
    }
  }, [id, modo]);

  const fetchCliente = async () => {
    try {
      const response = await fetch(API_BASE + '/clientes/' + id);
      const data = await response.json();
      if (data.success) {
        setFormData(data.data);
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao carregar cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = modo === 'create' 
        ? API_BASE + '/clientes' 
        : API_BASE + '/clientes/' + id;
      
      const method = modo === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        setMensagemSucesso(modo === 'create' ? 'Cliente criado com sucesso!' : 'Cliente atualizado com sucesso!');
        setTimeout(() => {
          navigate('/clientes');
        }, 1500);
      } else {
        setMensagemErro(data.message);
      }
    } catch {
      setMensagemErro('Erro ao guardar cliente');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>
        {modo === 'create' && 'Novo Cliente'}
        {modo === 'update' && 'Editar Cliente'}
        {modo === 'read' && 'Detalhes do Cliente'}
      </h2>

      {mensagemErro && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {mensagemErro}
          <button type="button" className="close" onClick={() => setMensagemErro('')} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {mensagemSucesso && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {mensagemSucesso}
          <button type="button" className="close" onClick={() => setMensagemSucesso('')} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="codcli">Código Cliente</label>
          <input
            type="text"
            className="form-control"
            id="codcli"
            name="codcli"
            value={formData.codcli}
            onChange={handleChange}
            disabled={modo === 'read' || modo === 'update'}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            disabled={modo === 'read'}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="morada">Morada</label>
          <input
            type="text"
            className="form-control"
            id="morada"
            name="morada"
            value={formData.morada}
            onChange={handleChange}
            disabled={modo === 'read'}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nif">NIF</label>
          <input
            type="text"
            className="form-control"
            id="nif"
            name="nif"
            value={formData.nif}
            onChange={handleChange}
            disabled={modo === 'read'}
            required
          />
        </div>

        <div className="form-group">
          {modo !== 'read' && (
            <>
              <button type="submit" className="btn btn-primary mr-2">
                {modo === 'create' ? 'Criar' : 'Guardar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/clientes')}>
                Cancelar
              </button>
            </>
          )}
          {modo === 'read' && (
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/clientes')}>
              Voltar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
