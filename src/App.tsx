import React, { useState, useEffect } from 'react';
import Table from 'components/Table';
import EmpresaModal from 'components/EmpresaModal';
import Pagination from 'components/Pagination';
import TeddyApi from 'utils/TeddyApi';
import { Empresa } from 'components/EmpresaModal';
import { excluir } from 'utils/EmpresasService';
import './styles.scss';

const App = () => {

  const columns = [
    { Header: 'Nome', accessor: 'name' },
    { Header: 'Nome da empresa', accessor: 'companyName' },
    { Header: 'Contagem de colaboradores', accessor: 'collaboratorsCount' },
    { Header: 'Ativa', accessor: 'isActive' },
  ];

  const [data, setData] = useState<Empresa[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEditData, setModalEditData] = useState<Empresa | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / 5);

  const loadAll = async () => {
    try {
      await TeddyApi.get(`/`).then((res) => {
        setData(res.data);
        return true;
      });
    } catch (err) {

    }
  };

  const onDelete = (id: any) => {
    excluir(id);
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  }

  const onEdit = (empresa: any) => {
    setModalEditData(empresa);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const refreshTable = () => {
    setTimeout(() => {
      loadAll();
    }, 500)
  }

  useEffect(() => {
    if (!isModalOpen) {
      setModalEditData(null);
    }
  }, [isModalOpen]);

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="partner-page">
      <button className="create-button" onClick={() => setIsModalOpen(true)}>
        Cadastrar empresa
      </button>

      <div className="table-container">
        <Table columns={columns}
          data={data.slice((currentPage - 1) * 5, currentPage * 5)}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => setCurrentPage(page)}
      />

      <EmpresaModal isOpen={isModalOpen} onRequestClose={handleCloseModal} refresh={refreshTable} edit={modalEditData}/>
    </div>
  );
};

export default App;