
import api from '../../odoo/api'


describe('Cypress For Odoo', () => {
  
  // Login

  context('Login', () => { 
      it('Check user/password', () => {
       cy.Login()
     })
  })
  
   
  context('Workflow Demo', () => { 
    
   // Example : Create Customer
   it('Customer', () => {
       cy.MainMenu('CRM','crm.crm_menu_root')
       cy.SubMenu('Customers','crm.res_partner_menu_crm')
       cy.Button('Create')
       cy.SetValue('name','Borni DHIFI')
       cy.SetValue('city','Ariana')
       cy.M2O_SetValue('country_id','Tunisia')
       cy.SetValue('mobile','0021621809219')
       cy.Button('Save')
    })

   // Example : Workflow Quotation
        /*
        - select partner
        - select first product : CONS_DEL01] Server
        - check value of unit_price after onchange product 
        - select second product
        - check value of unit_price after onchange product 
        - save quoation
        - check the amount_total of Quotation 
        - confirm quoation
        - check state should have  'Sales Order' value
         */
    it('Quotation', () => { 
       cy.MainMenu('Sales','sale.sale_menu_root')
       cy.SubMenu('Orders','sale.menu_sale_order')       
       cy.Button('Create')
       cy.M2O_SetValue('partner_id','Agrolait')
       cy.M2O_SetValue_O2M('order_line','product_id','[CONS_DEL01] Server')
       cy.O2M_CheckValue('order_line',1,'price_unit','60,000.00')
       cy.M2O_SetValue_O2M('order_line','product_id','[CPUi5] Processor Core i5 2.70 Ghz')
       cy.O2M_CheckValue('order_line',2,'price_unit','2,100.00')
       cy.Button('Save')
       cy.CheckValue('amount_total','62,100.00')
       cy.Waiting(1000)
       cy.Button('Confirm Sale')
       cy.Waiting(2000)       
       cy.State_CheckValue('state','Sales Order')

    })

    // Add your test case

    it('Your Test Case Name', () => {
       //...
       //...
    })   

  // Logout

  /*context('Logout', () => { 
      it('Logout', () => { 
       cy.Logout()
   
     })
  })*/
     
 })



  })
