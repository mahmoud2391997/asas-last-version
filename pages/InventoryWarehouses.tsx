
import React from 'react';
import { InventoryItem, Branch, Product } from '../types';
import { CubeIcon } from '../components/Icon';

interface InventoryWarehousesProps {
    inventory: InventoryItem[];
    branches: Branch[];
    products: Product[];
}

const InventoryWarehouses: React.FC<InventoryWarehousesProps> = ({ inventory, branches, products }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-pane" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>المخزون حسب المستودع</h3>
                <p style={{ color: 'var(--text-secondary)' }}>عرض تفصيلي للمنتجات المتوفرة في كل فرع ومستودع.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {branches.map(branch => {
                    const branchStock = inventory.filter(i => i.branchId === branch.id && i.quantity > 0);
                    
                    return (
                        <div key={branch.id} className="glass-pane" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--highlight-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <CubeIcon style={{width: '20px', height: '20px', color: 'var(--primary-color)'}}/>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{branch.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{branchStock.length} أصناف متوفرة</p>
                                </div>
                            </div>
                            <div style={{ padding: '0', flex: 1, overflowY: 'auto', maxHeight: '400px' }}>
                                {branchStock.length > 0 ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                        <thead style={{ position: 'sticky', top: 0, background: 'var(--surface-bg)', zIndex: 1 }}>
                                            <tr>
                                                <th style={{ textAlign: 'right', padding: '0.75rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>المنتج</th>
                                                <th style={{ textAlign: 'left', padding: '0.75rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>الكمية</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {branchStock.map(item => {
                                                const product = products.find(p => p.id === item.productId);
                                                const isLow = item.quantity <= item.minStock && item.minStock > 0;
                                                return (
                                                    <tr key={item.productId} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                                                        <td style={{ padding: '0.75rem 1.5rem' }}>
                                                            <div style={{ fontWeight: 600 }}>{product?.name}</div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{product?.sku}</div>
                                                        </td>
                                                        <td style={{ padding: '0.75rem 1.5rem', textAlign: 'left' }}>
                                                            <span style={{ 
                                                                fontWeight: 'bold', 
                                                                color: isLow ? '#ef4444' : 'var(--text-primary)' 
                                                            }}>
                                                                {item.quantity.toLocaleString()} {product?.baseUnit}
                                                            </span>
                                                            {isLow && <span style={{display: 'block', fontSize: '0.7rem', color: '#ef4444'}}>منخفض</span>}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>لا يوجد مخزون حالياً.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InventoryWarehouses;
