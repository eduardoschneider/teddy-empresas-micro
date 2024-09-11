import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { cadastrar, atualizar } from 'utils/EmpresasService';
import './styles.scss';

interface EmpresaModal {
  isOpen: boolean;
  onRequestClose: any;
  refresh: any;
  edit: any;
}

export interface Empresa {
  id: any,
  name: string;
  companyName: string;
  collaboratorsCount: string;
  isActive: boolean;
}

const EmpresaModal: React.FC<EmpresaModal> = ({ isOpen, onRequestClose, refresh, edit }) => {

  const [formData, setFormData] = React.useState<Empresa>({
    id: '',
    name: '',
    companyName: '',
    collaboratorsCount: '',
    isActive: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (edit) {
      handleEdicao();
    } else {
      handleCadastro();
    }
  };

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCadastro = async () => {
    cadastrar({
      name: formData.name,
      companyName: formData.companyName,
      collaboratorsCount: formData.collaboratorsCount,
      isActive: formData.isActive
    }, refresh);
    onRequestClose();
  };

  const handleEdicao = async () => {
    atualizar(formData.id, {
      name: formData.name,
      companyName: formData.companyName,
      collaboratorsCount: formData.collaboratorsCount,
      isActive: formData.isActive
    }, refresh);
    onRequestClose();
  };

  useEffect(() => {

    setFormData({
      id: edit?.id ?? '',
      name: edit?.name ?? '', 
      companyName: edit?.companyName ?? '',
      collaboratorsCount: edit?.collaboratorsCount ?? 0,
      isActive: edit?.isActive ?? false
    });

  }, [edit])

  return (
    <Modal isOpen={isOpen} className="modal" onRequestClose={() => onRequestClose()} overlayClassName="overlay">
      <button className="close" onClick={() => onRequestClose()}></button>
      <h2>Criar empresa</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nome:
          <input name="name" value={formData.name} onChange={(e) => handleChange(e)} className="field" type="text" required />
        </label>
        <label>
          Nome da empresa:
          <input name="companyName" value={formData.companyName} onChange={(e) => handleChange(e)} className="field" type="text" required />
        </label>
        <label>
          Contagem de colaboradores:
          <input name="collaboratorsCount" value={formData.collaboratorsCount} onChange={(e) => handleChange(e)} className="field" type="number" required />
        </label>
        <div className="form-checkbox">
          <input name="isActive" checked={formData.isActive} onChange={(e) => handleChange(e)} type="checkbox" />
          <label>
            Ativa
          </label>
        </div>
        <button type="submit" className="submit-button">{edit ? 'Salvar':'Cadastrar'}</button>
      </form>
    </Modal>
  );
};

export default EmpresaModal;