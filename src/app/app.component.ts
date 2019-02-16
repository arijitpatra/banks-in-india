import { Component } from "@angular/core";
import { DataService } from "./services/data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  data = [];
  filteredData = [];
  selectedCity = "MUMBAI";
  isDataLoading = true;
  filterText = "";
  isFilterTextDebounce = false;
  filterTimeout: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // to get the bank details
    this.dataService.getData(this.selectedCity).subscribe((x: any) => {
      this.data = this.filteredData = x;
      this.isDataLoading = false;
    });
  }

  onCityChange(e) {
    this.isDataLoading = true;
    this.selectedCity = e;
    this.dataService.getData(this.selectedCity).subscribe((x: any) => {
      this.data = this.filteredData = x;
      if (this.filterText !== "") {
        this.doFilter();
      }
      this.isDataLoading = false;
    });
  }

  doFilter() {
    this.isFilterTextDebounce = true;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.filteredData = this.data.filter(x => {
        if (
          x.ifsc.toUpperCase().includes(this.filterText.toUpperCase()) ||
          x.bank_id
            .toString()
            .toUpperCase()
            .includes(this.filterText.toUpperCase()) ||
          x.branch.toUpperCase().includes(this.filterText.toUpperCase()) ||
          x.address.toUpperCase().includes(this.filterText.toUpperCase()) ||
          x.city.toUpperCase().includes(this.filterText.toUpperCase()) ||
          x.district.toUpperCase().includes(this.filterText.toUpperCase()) ||
          x.state.toUpperCase().includes(this.filterText.toUpperCase()) ||
          x.bank_name.toUpperCase().includes(this.filterText.toUpperCase())
        ) {
          return x;
        }
      });
      this.isFilterTextDebounce = false;
    }, 250);
  }
}
