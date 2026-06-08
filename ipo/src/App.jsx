import { Routes, Route, Link } from 'react-router-dom';
function App() {
return (
<div>
{/* Barra de navegação superior em bootstap 4 */}
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container">
<Link className="navbar-brand" to="/">IPO</Link>
<div className="navbar-nav">
<Link className="nav-link" to="/clientes">Clientes</Link>
<Link className="nav-link" to="/veiculos">Veículos</Link>
<Link className="nav-link" to="/inspecoes">Inspeções</Link>
</div>
</div>
</nav>
<div className="container mt-4">
<Routes>
<Route path="/" element={<Inicio />} />
<Route path="/clientes" element={<ClientesList />} />
<Route path="/veiculos" element={<VeiculosList />} />
<Route path="/inspecoes" element={<InspecoesList />} />
</Routes>
</div>
</div>
);
}
// Estas páginas serão criadas nas próximas etapas
function Inicio() {
return (<h2>Bem-vindo ao sistema IPO</h2>);
}
function ClientesList() {
return (<h2>Página de Clientes</h2>);
}
function VeiculosList() {
return (<h2>Página de Veículos</h2>);
}
function InspecoesList() {
return (<h2>Página de Inspeções</h2>);
}
export default App