import fs from 'fs';
import path from 'path';

type Customer = {
  name: string;
  email: string;
  phone: string;
};

const customerFile = path.resolve('TestData/customer_data.json');

export function SaveDataToFile(customerData: Customer) {
  let data: { customers: Customer[] } = { customers: [] };

  if (fs.existsSync(customerFile)) {

    const fileContent = fs.readFileSync(customerFile, 'utf-8');

    if (fileContent.trim() !== '') {
    data = JSON.parse(fileContent);
  }
  }

  data.customers.push(customerData);

  fs.writeFileSync(
    customerFile,
    JSON.stringify(data, null, 2)
  );
}





