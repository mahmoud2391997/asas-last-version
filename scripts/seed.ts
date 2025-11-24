import fetch from 'node-fetch';
import {
    USERS,
    PRODUCTS,
    SALES,
    CUSTOMERS,
    MOCK_PURCHASE_INVOICES,
    EMPLOYEES,
    MOCK_RENEWABLES,
    BRANCHES,
    INVENTORY,
    LEAVE_REQUESTS,
    ATTENDANCE_RECORDS,
    EXPENSES,
    FINANCIAL_ACCOUNTS,
    SESSIONS,
    MANUFACTURING_ORDERS_MOCK,
    INVENTORY_ADJUSTMENT_LOGS,
    PRODUCTION_TASKS,
    CHART_OF_ACCOUNTS,
    MOCK_ADVANCE_REQUESTS,
    MOCK_GENERAL_REQUESTS,
    MOCK_SUPPLIERS,
    MOCK_PURCHASE_REQUESTS,
    MOCK_PURCHASE_ORDERS,
    MOCK_PURCHASE_RETURNS,
    MOCK_SUPPLIER_PAYMENTS,
    MOCK_DEBIT_NOTES,
    MOCK_RFQS,
    MOCK_QUOTATIONS,
    MOCK_SALES_QUOTATIONS,
    MOCK_SALES_RETURNS,
    MOCK_CREDIT_NOTES,
    MOCK_RECURRING_INVOICES,
    MOCK_CUSTOMER_PAYMENTS,
    MOCK_INVENTORY_VOUCHERS,
    MOCK_INVENTORY_REQUISITIONS,
    MOCK_JOURNAL_VOUCHERS,
    MOCK_WHATSAPP_LOGS,
    MOCK_SHIPMENTS
} from '../src/services/mockData.js';

const API_BASE_URL = 'http://localhost:5000/api';

export async function sendData(endpoint: string, data: any[]) {
    for (const item of data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to send data to ${endpoint}: ${response.status} ${response.statusText}`, errorText);
            }
        } catch (error) {
            console.error(`Error sending data to ${endpoint}:`, error);
        }
    }
}

export async function seedDatabase() {
    await sendData('/users', USERS);
    await sendData('/products', PRODUCTS);
    await sendData('/sales', SALES);
    await sendData('/customers', CUSTOMERS);
    await sendData('/purchase-invoices', MOCK_PURCHASE_INVOICES);
    await sendData('/employees', EMPLOYEES);
    await sendData('/renewables', MOCK_RENEWABLES);
    await sendData('/branches', BRANCHES);
    await sendData('/inventory', INVENTORY);
    await sendData('/leave-requests', LEAVE_REQUESTS);
    await sendData('/attendance', ATTENDANCE_RECORDS);
    await sendData('/expenses', EXPENSES);
    await sendData('/financial-accounts', FINANCIAL_ACCOUNTS);
    await sendData('/pos-sessions', SESSIONS);
    await sendData('/manufacturing-orders', MANUFACTURING_ORDERS_MOCK);
    await sendData('/inventory-adjustments', INVENTORY_ADJUSTMENT_LOGS);
    await sendData('/production-tasks', PRODUCTION_TASKS);
    await sendData('/chart-of-accounts', CHART_OF_ACCOUNTS);
    await sendData('/advance-requests', MOCK_ADVANCE_REQUESTS);
    await sendData('/general-requests', MOCK_GENERAL_REQUESTS);
    await sendData('/suppliers', MOCK_SUPPLIERS);
    await sendData('/purchase-requests', MOCK_PURCHASE_REQUESTS);
    await sendData('/purchase-orders', MOCK_PURCHASE_ORDERS);
    await sendData('/purchase-returns', MOCK_PURCHASE_RETURNS);
    await sendData('/supplier-payments', MOCK_SUPPLIER_PAYMENTS);
    await sendData('/debit-notes', MOCK_DEBIT_NOTES);
    await sendData('/rfqs', MOCK_RFQS);
    await sendData('/purchase-quotations', MOCK_QUOTATIONS);
    await sendData('/sales-quotations', MOCK_SALES_QUOTATIONS);
    await sendData('/sales-returns', MOCK_SALES_RETURNS);
    await sendData('/credit-notes', MOCK_CREDIT_NOTES);
    await sendData('/recurring-invoices', MOCK_RECURRING_INVOICES);
    await sendData('/customer-payments', MOCK_CUSTOMER_PAYMENTS);
    await sendData('/inventory-vouchers', MOCK_INVENTORY_VOUCHERS);
    await sendData('/inventory-requisitions', MOCK_INVENTORY_REQUISITIONS);
    await sendData('/journal-vouchers', MOCK_JOURNAL_VOUCHERS);
    await sendData('/whatsapp-logs', MOCK_WHATSAPP_LOGS);
    await sendData('/shipments', MOCK_SHIPMENTS);

    console.log('Database seeding completed.');
}

seedDatabase();
