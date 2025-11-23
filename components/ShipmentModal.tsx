
import React, { useState, useEffect } from 'react';
import { Shipment, ShipmentItem, Branch, Supplier, Product } from '../types';
import { PlusIcon, TrashIcon } from './Icon';

interface ShipmentModalProps {
    shipment: Partial<Shipment> | null;
    onClose: () => void;
    onSave: (shipment: Shipment) => void;
    branches: Branch[];
    suppliers: Supplier[];
    products: Product[];
    restrictSourceType?: 'Supplier' | 'Branch';
}

const ShipmentModal: React.FC<ShipmentModalProps> = ({ shipment, onClose, onSave, branches, suppliers, products, restrictSourceType }) => {
    const isCreating = !shipment?.id;
    const [editableShipment, setEditableShipment] = useState<Partial<Shipment>>({});

    useEffect(() => {
        const defaultSourceType = restrictSourceType || 'Branch';
        const defaultSourceId = defaultSourceType === 'Branch' ? branches[0]?.id : suppliers[0]?.id;

        setEditableShipment(isCreating ? {
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            sourceType: defaultSourceType,
            sourceId: defaultSourceId,
            destinationBranchId: branches.length > 1 ? branches[1].id : branches[0]?.id,
            items: [],
            trackingNumber: `SH-${Date.now()}`,
            ...shipment // Override with any passed props
        } : shipment);
    }, [shipment, isCreating, branches, suppliers, restrictSourceType]);

    const handleFieldChange = (field: keyof Shipment, value: any) => {
        setEditableShipment(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index: number, field: keyof ShipmentItem, value: any) => {
        const newItems = [...(editableShipment.items || [])];
        if (field === 'productId') newItems[index].productId = Number(value);
        if (field === 'quantity') newItems[index].quantity = Number(value);
        setEditableShipment(prev => ({ ...prev, items: newItems }));
    };

    const handleAddItem = () => {
        setEditableShipment(prev => ({ ...prev, items: [...(prev.items || []), { productId: 0, quantity: 1 }] }));
    };

    const handleRemoveItem = (index: number) => {
        setEditableShipment(prev => ({ ...prev, items: (prev.items || []).filter((_, i) => i !== index) }));
    };

    const handleSaveClick = () => {
        if (!editableShipment.sourceId || !editableShipment.destinationBranchId || (editableShipment.items || []).length === 0) {
            alert('Please fill all required fields.');
            return;
        }
        if (editableShipment.sourceType === 'Branch' && editableShipment.sourceId === editableShipment.destinationBranchId) {
            alert('Source and destination cannot be the same.');
            return;
        }
        onSave(editableShipment as Shipment);
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content glass-pane" onClick={e => e.stopPropagation()} style={{ maxWidth: '50rem' }}>
                <div className="modal-header">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{isCreating ? 'إنشاء شحنة جديدة' : `تعديل شحنة #${editableShipment.trackingNumber}`}</h2>
                </div>
                <div className="modal-body">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label className="form-label">نوع المصدر</label>
                            <select 
                                value={editableShipment.sourceType} 
                                onChange={e => handleFieldChange('sourceType', e.target.value)} 
                                className="form-select"
                                disabled={!isCreating || !!restrictSourceType}
                            >
                                <option value="Branch">فرع/مستودع</option>
                                <option value="Supplier">مورد</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">المصدر</label>
                            <select 
                                value={editableShipment.sourceId} 
                                onChange={e => handleFieldChange('sourceId', Number(e.target.value))} 
                                className="form-select"
                                disabled={!isCreating}
                            >
                                {editableShipment.sourceType === 'Branch' 
                                    ? branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)
                                    : suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label className="form-label">الوجهة (الفرع المستلم)</label>
                            <select 
                                value={editableShipment.destinationBranchId} 
                                onChange={e => handleFieldChange('destinationBranchId', Number(e.target.value))} 
                                className="form-select"
                                disabled={!isCreating}
                            >
                                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">التاريخ</label>
                            <input type="date" value={editableShipment.date} onChange={e => handleFieldChange('date', e.target.value)} className="form-input" />
                        </div>
                        <div>
                            <label className="form-label">حالة الشحنة</label>
                            <select value={editableShipment.status} onChange={e => handleFieldChange('status', e.target.value)} className="form-select">
                                <option value="Pending">قيد الانتظار</option>
                                <option value="In Transit">في الطريق</option>
                                <option value="Delivered">تم التسليم</option>
                                <option value="Cancelled">ملغاة</option>
                            </select>
                        </div>
                         <div>
                            <label className="form-label">اسم السائق (اختياري)</label>
                            <input type="text" value={editableShipment.driverName || ''} onChange={e => handleFieldChange('driverName', e.target.value)} className="form-input" />
                        </div>
                    </div>

                    <h4 style={{marginBottom: '0.5rem', fontWeight: 600}}>الأصناف</h4>
                    <div className="table-wrapper">
                        <table>
                            <thead><tr><th>المنتج</th><th style={{width:'100px'}}>الكمية</th><th style={{width:'50px'}}></th></tr></thead>
                            <tbody>
                                {(editableShipment.items || []).map((item, index) => (
                                    <tr key={index}>
                                        <td style={{padding: '0.5rem'}}><select value={item.productId} onChange={e => handleItemChange(index, 'productId', e.target.value)} className="form-select"><option value={0}>اختر...</option>{products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></td>
                                        <td style={{padding: '0.5rem'}}><input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="form-input" /></td>
                                        <td><button onClick={() => handleRemoveItem(index)} style={{color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer'}}><TrashIcon style={{width:'20px',height:'20px'}}/></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{marginTop: '0.5rem'}}>
                        <button onClick={handleAddItem} className="btn btn-ghost"><PlusIcon style={{width:'20px',height:'20px'}}/> إضافة صنف</button>
                    </div>
                </div>
                <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '1rem' }}>
                    <button onClick={onClose} className="btn btn-ghost">إلغاء</button>
                    <button onClick={handleSaveClick} className="btn btn-secondary">حفظ</button>
                </div>
            </div>
        </div>
    );
};

export default ShipmentModal;
