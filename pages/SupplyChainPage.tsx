
import React, { useState, useMemo } from 'react';
import { Shipment, Branch, Supplier, Product } from '../types';
import { PlusIcon, TruckIcon, CheckCircleIcon, XCircleIcon } from '../components/Icon';
import ShipmentModal from '../components/ShipmentModal';

interface SupplyChainPageProps {
    mode?: 'supplies' | 'movements';
    shipments: Shipment[];
    branches: Branch[];
    suppliers: Supplier[];
    products: Product[];
    onSave: (shipment: Shipment) => void;
}

const SupplyChainPage: React.FC<SupplyChainPageProps> = ({ mode = 'movements', shipments, branches, suppliers, products, onSave }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState<Partial<Shipment> | null>(null);
    const [filterStatus, setFilterStatus] = useState('all');

    // In 'supplies' mode, we restrict the view to shipments coming from Suppliers
    const filteredShipments = useMemo(() => {
        return shipments.filter(s => {
            const statusMatch = filterStatus === 'all' || s.status === filterStatus;
            const modeMatch = mode === 'supplies' ? s.sourceType === 'Supplier' : true; 
            return statusMatch && modeMatch;
        });
    }, [shipments, filterStatus, mode]);

    const getSourceName = (type: 'Supplier' | 'Branch', id: number) => {
        if (type === 'Branch') return branches.find(b => b.id === id)?.name || 'Unknown Branch';
        return suppliers.find(s => s.id === id)?.name || 'Unknown Supplier';
    };

    const getBranchName = (id: number) => branches.find(b => b.id === id)?.name || 'Unknown';

    const getShipmentContents = (shipment: Shipment) => {
        return shipment.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return `${product?.name || 'Unknown'} (${item.quantity})`;
        }).join('، ');
    };

    const getStatusChip = (status: string) => {
        const styles: {[key: string]: {bg: string, text: string}} = {
            'Pending': { bg: '#f59e0b', text: '#111' },
            'In Transit': { bg: '#3b82f6', text: '#fff' },
            'Delivered': { bg: '#10b981', text: '#fff' },
            'Cancelled': { bg: '#ef4444', text: '#fff' },
        };
        const style = styles[status] || styles['Pending'];
        return <span style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, borderRadius: '9999px', color: style.text, background: style.bg }}>{status}</span>;
    };

    const handleAddNew = () => {
        // Pre-fill sourceType if in supplies mode
        setSelectedShipment({
            sourceType: mode === 'supplies' ? 'Supplier' : undefined
        });
        setIsModalOpen(true);
    };

    const handleEdit = (shipment: Shipment) => {
        setSelectedShipment(shipment);
        setIsModalOpen(true);
    };

    const pageTitle = mode === 'supplies' ? 'إدارة التوريدات' : 'حركات التوريد والنقل';
    const pageDescription = mode === 'supplies' 
        ? 'إدارة الشحنات الواردة من الموردين إلى المستودعات.' 
        : 'سجل شامل لجميع حركات النقل والتوريد بين الفروع والموردين.';
    const addButtonLabel = mode === 'supplies' ? 'تسجيل توريد جديد' : 'شحنة جديدة';

    return (
        <>
            <div className="glass-pane" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{pageTitle}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{pageDescription}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleAddNew}>
                        <PlusIcon style={{ width: '20px', height: '20px' }} />
                        {addButtonLabel}
                    </button>
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="form-select" style={{maxWidth: '200px'}}>
                        <option value="all">كل الحالات</option>
                        <option value="Pending">قيد الانتظار</option>
                        <option value="In Transit">في الطريق</option>
                        <option value="Delivered">تم التسليم</option>
                    </select>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>رقم التتبع</th>
                                <th>التاريخ</th>
                                <th>المصدر</th>
                                <th>الوجهة</th>
                                <th style={{width: '40%'}}>المحتويات</th>
                                <th>الحالة</th>
                                <th>السائق</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShipments.map(s => (
                                <tr key={s.id} onClick={() => handleEdit(s)} style={{ cursor: 'pointer' }}>
                                    <td style={{fontWeight: 600}}>{s.trackingNumber}</td>
                                    <td>{new Date(s.date).toLocaleDateString('ar-EG')}</td>
                                    <td>
                                        <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block'}}>{s.sourceType === 'Branch' ? 'فرع' : 'مورد'}</span>
                                        {getSourceName(s.sourceType, s.sourceId)}
                                    </td>
                                    <td>{getBranchName(s.destinationBranchId)}</td>
                                    <td style={{fontSize: '0.9rem', color: 'var(--text-primary)'}}>
                                        {getShipmentContents(s)}
                                    </td>
                                    <td>{getStatusChip(s.status)}</td>
                                    <td>{s.driverName || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredShipments.length === 0 && <p style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>لا توجد بيانات حالياً.</p>}
                </div>
            </div>
            {isModalOpen && (
                <ShipmentModal
                    shipment={selectedShipment}
                    onClose={() => setIsModalOpen(false)}
                    onSave={onSave}
                    branches={branches}
                    suppliers={suppliers}
                    products={products}
                    restrictSourceType={mode === 'supplies' ? 'Supplier' : undefined}
                />
            )}
        </>
    );
};

export default SupplyChainPage;
