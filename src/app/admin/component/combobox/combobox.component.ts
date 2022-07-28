import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class ComboboxComponent implements OnInit {
  @Input()
  list: any[] = [];
  @Output() ProductName = new EventEmitter<string>();
  lists: string[] = [];
  // two way binding for input text
  inputItem = '';
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;
  i = 0;
  // the list to be shown after filtering
  filteredList: string[] = [];

  constructor() {}

  ngOnInit() {}

  // modifies the filtered list as per input
  getFilteredList() {
    this.listHidden = false;
    this.list.forEach((e) => {
      this.lists[this.i] = e.ProductName;
      this.i++;
    });
    this.i = 0;
    // this.selectedIndex = 0;
    if (
      !this.listHidden &&
      this.inputItem !== undefined &&
      this.filteredList !== null
    ) {
      this.filteredList = this.lists.filter((item) =>
        item.toLowerCase().includes(this.inputItem.toLowerCase())
      );
    }
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind: number) {
    this.inputItem = this.filteredList[ind];
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  // navigate through the list of items
  onKeyPress(event: { key: string }) {
    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === 'Enter') {
        this.toggleListDisplay(0);
      }
      if (event.key === 'ArrowDown') {
        this.listHidden = false;
        this.selectedIndex =
          (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName('list-item')
            [this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex =
          (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName('list-item')
            [this.selectedIndex].scrollIntoView();
        }
      }
      if (this.inputItem === '') {
        this.listHidden = true;
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.lists.includes(this.inputItem)) {
          this.showError = true;
          this.filteredList = this.lists;
        } else {
          this.showError = false;
        }
      }, 500);
    }
  }
  addProductName(input: string) {
    this.ProductName.emit(input);
  }
}
