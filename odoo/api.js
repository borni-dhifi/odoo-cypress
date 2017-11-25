
/*-----------------------------------------------------------------
           			Odoo APi For Cypress
  ---------------------------------------------------------------*/
	  
var odoo_url= Cypress.env("odoo_url")  
var database= Cypress.env("database") 
var user= Cypress.env("user") 
var password= Cypress.env("password") 

/*-----------------------------------------------------------------
		Login 
Login to odoo_url for database 'database' using user/ password
EX: cy.Login()
-----------------------------------------------------------------*/
Cypress.Commands.add('Login', () => {  
      cy.visit(odoo_url+'/web/database/selector')	 
      cy.url().should('contain', '/web/database/selector')
      cy.get('.o_database_list').contains(database).should('have.class', 'list-group-item').click()
      cy.Waiting(1000)
      cy.url().should('include', '/web/login')
      cy.get('form').within(function(){
         cy.get('input[name="login"]').should('have.attr', 'name', 'login').type(user).should('have.value', user)
         cy.get('input[name="password"]').should('have.attr', 'name', 'password').type(password).should('have.value', password)
         cy.root().submit()
      })   
     cy.Waiting(1000)
})


/*-----------------------------------------------------------------
		Logout 
EX: cy.Logout()
-----------------------------------------------------------------*/
Cypress.Commands.add('Logout', () => {      
      cy.visit(odoo_url+'/web/session/logout')	 
})


/*-----------------------------------------------------------------
		MainMenu
Click To main menu using  Name and XML_ID for this menu 
EX: cy.MainMenu('Sales','sale.sale_menu_root')
-----------------------------------------------------------------*/
Cypress.Commands.add('MainMenu', (menu_name,xml_id) => { 
  cy.get('nav').contains(menu_name).should('have.attr', 'data-menu-xmlid', xml_id).click()
  cy.Waiting(3000)
})


/*-----------------------------------------------------------------
		SubMenu
Click To sub menu using Name and XML_ID for this submenu
EX: cy.SubMenu('Orders','sale.menu_sale_order')
-----------------------------------------------------------------*/
Cypress.Commands.add('SubMenu', (menu_name,xml_id) => { 
  cy.contains('span', menu_name).parent().should('have.attr', 'data-menu-xmlid', xml_id).click({force: true })
  cy.Waiting(4000)
})


/*-----------------------------------------------------------------
		Button
Click to Button using button Name.
EX: cy.Button('Create')
-----------------------------------------------------------------*/
Cypress.Commands.add('Button', (button_name) => { 
  cy.contains('button', button_name).click({force: true })
  cy.Waiting(1000)
})


/*-----------------------------------------------------------------
		SetValue
Set value for  field  (Fields : Char, Integer, Float,..)
EX: cy.SetValue('name','Borni')
-----------------------------------------------------------------*/
Cypress.Commands.add('SetValue', (field_name,val) => { 
  cy.get('input[name="'+field_name+'"]').should('have.attr', 'name', field_name).type(val).should('have.value', val)
})


/*-----------------------------------------------------------------
		M2O_SetValue
Set value for Many2one field  
params - field_name : name of field m2o
       - val : value of record you want select it
cy.M2O_SetValue('partner_id','Agrolait')
-----------------------------------------------------------------*/
Cypress.Commands.add('M2O_SetValue', (field_name,val) => { 
  cy.get('div[name="'+field_name+'"]').find('input').first().type(val).should('have.value', val)
  cy.Waiting(500)
  cy.get('.ui-autocomplete>li.ui-menu-item').should('be.visible').contains(val).click({ force: true }) //--> must seach a visible autocomplete
  cy.Waiting(500)
})


/*-----------------------------------------------------------------
		M2O_SetValue_O2M
Set Value for Many2one field on One2many field  
ccy.M2O_SetValue_O2M('order_line','product_id','[CONS_DEL01] Server')
-----------------------------------------------------------------*/
Cypress.Commands.add('M2O_SetValue_O2M', (o2m_field_name,m2o_field_name,m2o_record_name) => { 
  cy.get('div[name="'+o2m_field_name+'"]').contains('Add an item').click()
  cy.M2O_SetValue(m2o_field_name,m2o_record_name)
  // must check if tree of o2m_field have attr editable=buttom/top
  // use jquery to check if body have a span contains Save  & Close
  // if yes we must click in bouton Save  & Close
  var span_save_close = Cypress.$("span:contains('Save  & Close')") 
  if (span_save_close.length != 0 ){  //<-- dont work FIXME 
	cy.Button('Save  & Close')
  }
})


/*-----------------------------------------------------------------
		CheckValue
Check field value
cy.CheckValue('amount_total','62,100.00')
-----------------------------------------------------------------*/
Cypress.Commands.add('CheckValue', (field_name,value) => { 
   cy.get('span[name="'+field_name+'"]').should('contain', value)
})


/*-----------------------------------------------------------------
		State_CheckValue
Check State fiels value
cy.State_CheckValue('state','Sales Order')
-----------------------------------------------------------------*/
Cypress.Commands.add('State_CheckValue', (field_state,value) => { 
    cy.get('div[name="'+field_state+'"]').contains(value).should('have.class', 'btn-primary')
})


/*-----------------------------------------------------------------
		O2M_CheckValue
Check field value in One2many 
o2m_field_name : name of One2many field
ligne_number: number of ligne of records
field: name of field or number of column (td) 
value: val we want check it
Must chek if mode is :
-readonly :(arg field must be integer) use span to find element and check value
-edit :(arg field must be the name of field) use input to find element and check value
note : if your One2many have handle field in tree must consider it in field number
ex : check if selected product [CONS_DEL01] Server (line:1) have value 35,319.51 in price_unit
cy.O2M_CheckValue('order_line',1,'price_unit','35,319.51') 
-----------------------------------------------------------------*/
Cypress.Commands.add('O2M_CheckValue', (o2m_field_name,ligne_number,field,value) => { 
   if (isNumber(field)){
      cy.get('div[name="'+o2m_field_name+'"]').find('table>tbody>tr').eq(ligne_number-1).find('td').eq(field).contains(value).should('contain', value)
    }
   else{      
      cy.get('div[name="'+o2m_field_name+'"]').find('table>tbody>tr').eq(ligne_number-1).find('input[name="'+field+'"]').should('have.value', value)
    }
})


/*-----------------------------------------------------------------
		View
Go To view .
arg type must be : list,kanban,calendar,pivot,graph
EX: cy.View('kanban')
-----------------------------------------------------------------*/
Cypress.Commands.add('View', (type) => {
   // TODO:
})


/*-----------------------------------------------------------------
		PageNext
Go To next page
EX: cy.PageNext()
-----------------------------------------------------------------*/
Cypress.Commands.add('PageNext', (type) => {
   // TODO:
})


/*-----------------------------------------------------------------
		PagePrevious
Go To previous page
EX: cy.PagePrevious()
-----------------------------------------------------------------*/
Cypress.Commands.add('PagePrevious', (type) => {
   // TODO:
})


/*-----------------------------------------------------------------
		Install
Install module.
EX: cy.Install('crm')
-----------------------------------------------------------------*/
Cypress.Commands.add('Install', (type) => {
   // TODO:
})


/*-----------------------------------------------------------------
		Waiting
Function to  wait to finish previous request
I think you cannot use cy.route() because load_views launched after POST
TODO: So i mak it static , must find another way
EX: cy.Waiting(5000)
-----------------------------------------------------------------*/
Cypress.Commands.add('Waiting', (time) => {
  cy.wait(time)
})






/*-----------------------------------------------------------------
		JS Util FUNCTION
-----------------------------------------------------------------*/
function isNumber(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}


