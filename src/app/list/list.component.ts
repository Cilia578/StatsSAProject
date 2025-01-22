import { Component ,OnInit} from '@angular/core';
import { EmpListService } from '../emp-list.service';
import { FormBuilder, FormGroup, FormControl,Validators} from '@angular/forms';
import { Employee } from '../employee';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent  implements OnInit{



 filteredEmployeeList: Employee[] = [];
 statusOption: string[]= ['Active', 'Inactive'];

 selectedStatus: string = 'All';
  searchTerm: string = '';
  formDataForm!: FormGroup;
 
  isEditing = false;
  selectedEmployee: any;

   allEmployee:Employee[]=[];
  constructor(private empListService: EmpListService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.formDataForm = this.formBuilder.group({
      id: [''],
      firstName:   ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      isActive: [false, Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      status: [''] 

    });
    // Property to hold the selected status

    this.formDataForm.get('status')?.valueChanges.subscribe((value) => {
      this.selectedStatus = value;
    });
// Update selectedStatus when the form control changes
this.formDataForm.get('status')?.valueChanges.subscribe((value) => {
  this.selectedStatus = value;
});

   
    this.onSubmit() ;
   // this.deleteEmployee(this.employeeId);
    this.empListService.getAll().subscribe((data: any)=>{
      this.allEmployee=data;
      this.filteredEmployeeList = [...this.allEmployee];
      console.log(this.allEmployee);
    })
    
    //this.refreshEmployeeList();
    /*
    this.empListService.UpdateEmployee().subscribe((data: any)=>{
        this.allEmployee=data;

    })
    */
    this. applyFilter() ;
  }
 
  
  onSubmit() {
    if (this.formDataForm.valid) {
      const formData = this.formDataForm.value;

      if (this.isEditing) {
        this.empListService.UpdateEmployee(this.selectedEmployee.id, formData).subscribe(
          (response) => {
            console.log('Employee updated successfully:', response);
            this.formDataForm.reset();
            this.selectedEmployee = null;
            this.isEditing = false;
          },
          (error) => {
            console.error('Error updating employee:', error);
          }
        );
      } else {

        this.empListService.AddEmployee(formData).subscribe(
          (response) => {
            console.log('Employee added successfully:', response);
            this.formDataForm.reset();
          },
          (error) => {
            console.error('Error adding employee:', error);
          }
        );
      }
    }
  }

  
  editEmployee(employee: any) {
    // Set the selected employee for editing
    this.selectedEmployee = employee;
  
    // Populate the form with the selected employee's data
    this.formDataForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: employee.dateOfBirth,
      isActive: employee.isActive,
      age: employee.age,
    });
    this.isEditing = true;
  }
  deleteEmployee(employeeId: number) {
    
    this.empListService.DeleteEmployee(employeeId).subscribe(
      (response) => {
        console.log('Employee deleted successfully:', response);
      
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  
  
  
    }

  /*  refreshEmployeeList() {
      
      // Fetch the list of employees from your data service or API
      this.empListService.getAll().subscribe(
        (data: any) => {
          this.filteredEmployeeList = data;
        },
        (error) => {
          console.error('Error fetching employee data:', error);
        }
      );
    }
    */
  /*applyFilter() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredEmployeeList = this.filteredEmployeeList.filter((employee) =>
      employee.firstName.toLowerCase().includes(searchTerm) ||
      employee.lastName.toLowerCase().includes(searchTerm) ||
      employee.dateOfBirth.toDateString().toLowerCase().includes(searchTerm) || 
      (employee.isActive ? 'Active' : 'Inactive').toLowerCase().includes(searchTerm) ||
      employee.age.toString().includes(searchTerm)
    );
  }*/
  
  /*applyFilter() {
    
    const searchTerm = this.searchTerm.toLowerCase().trim();
    //const statusOption = this.formDataForm.get('status')?.value;
 
  this.filteredEmployeeList = this.allEmployee.filter((employee) => {
    const firstName = employee.firstName.toLowerCase();
    const lastName = employee.lastName.toLowerCase();
    (this.selectedStatus === 'Active' && employee.isActive) ||
      (this.selectedStatus === 'Inactive' && !employee.isActive)
    
  });
  
    
    if (!searchTerm) {
      // If the search term is empty, show all records
      this.filteredEmployeeList = this.allEmployee;
      
      return;
    }
  
    this.filteredEmployeeList = this.allEmployee.filter((employee) =>
    employee.firstName.toString().toLowerCase().includes(searchTerm) ||
    employee.lastName.toString().toLowerCase().includes(searchTerm) 
    
    );

  
  }*/

  // Filter function to apply the selected status filter
applyFilter() {
  if (this.selectedStatus === 'All') {
    this.filteredEmployeeList = [...this.allEmployee]; // Show all employees
  } else {
    this.filteredEmployeeList = this.allEmployee.filter((employee) =>
      (this.selectedStatus === 'Active' && employee.isActive) ||
      (this.selectedStatus === 'Inactive' && !employee.isActive)
    );
  }
}

onStatusChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  this.selectedStatus = selectedValue;
  this.applyFilter();
}


  }