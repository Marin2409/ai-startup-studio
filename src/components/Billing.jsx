import React, { useState } from 'react'
import { 
  CreditCard, 
  Download, 
  Plus, 
  AlertCircle, 
  FileText,
  ExternalLink
} from 'lucide-react'

const Billing = () => {
  const [spendCapEnabled, setSpendCapEnabled] = useState(true)
  const [emailRecipient, setEmailRecipient] = useState('jamrin2409@gmail.com')
  const [additionalEmails, setAdditionalEmails] = useState('')
  const [billingInfo, setBillingInfo] = useState({
    name: "JoseMarin's Org",
    address: "5309 Scenic View Dr",
    address2: "",
    country: "United States of America",
    city: "Austin",
    state: "Texas",
    zipCode: "78746",
    taxId: ""
  })

  const handleBillingInfoChange = (field, value) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveEmailRecipient = () => {
    // Handle save logic here
    console.log('Saving email recipient:', emailRecipient, additionalEmails)
  }

  const handleSaveBillingInfo = () => {
    // Handle save logic here
    console.log('Saving billing info:', billingInfo)
  }

  return (
    <div className="billing-container">
      <div className="billing-content">
        <div className="billing-header">
          <h1 className="billing-title">Billing</h1>
        </div>

        <div className="billing-sections">
          {/* Subscription Plan Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Subscription Plan</h2>
              <p className="section-description">
                Each organization has it's own subscription plan, billing cycle, payment 
                methods and usage quotas.
              </p>
            </div>
            <div className="section-right">
              <div className="subscription-card">
                <div className="subscription-header">
                  <span className="plan-name">Free Plan</span>
                  <button className="change-plan-btn">
                    Change subscription plan
                  </button>
                </div>
                
                <div className="usage-warning">
                  <div className="warning-icon">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="warning-content">
                    <h3 className="warning-title">This organization is limited by the included usage</h3>
                    <p className="warning-description">
                      Projects may become unresponsive when this organization exceeds its included usage 
                      quota. To scale seamlessly, upgrade to a paid plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Control Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Cost Control</h2>
              <p className="section-description">
                Allow scaling beyond your plan's <span className="text-link">included quota</span>.
              </p>
              <div className="more-info">
                <h3 className="info-title">More information</h3>
                <a href="#" className="spend-cap-link">
                  <span>Spend cap</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="section-right">
              <div className="cost-control-card">
                <p className="cost-control-description">
                  If you need to go beyond the included quota, simply switch off your spend cap to pay for additional usage.
                </p>
                
                <div className="spend-cap-section">
                  <div className="spend-cap-chart">
                    <div className="chart-bars">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="chart-bar" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="spend-cap-info">
                    <h3 className="spend-cap-title">Spend cap is enabled</h3>
                    <p className="spend-cap-description">
                      You won't be charged any extra for usage. However, your projects could 
                      become unresponsive or enter read only mode if you exceed the included quota.
                    </p>
                    <button className="change-spend-cap-btn">
                      Change spend cap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Invoices Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Past Invoices</h2>
              <p className="section-description">
                You get an invoice every time you change your plan or when your 
                monthly billing cycle resets.
              </p>
            </div>
            <div className="section-right">
              <div className="invoices-card">
                <div className="invoice-table">
                  <div className="table-header">
                    <div className="table-cell">Date</div>
                    <div className="table-cell">Amount</div>
                    <div className="table-cell">Invoice number</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell"></div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell">
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="table-cell">Jul 02, 2025</div>
                    <div className="table-cell">$0.00</div>
                    <div className="table-cell">AKIGVA-00001</div>
                    <div className="table-cell">
                      <span className="status-badge paid">Paid</span>
                    </div>
                    <div className="table-cell">
                      <button className="download-btn">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="invoice-pagination">
                  <span className="pagination-text">Showing 1 to 1 out of 1 invoices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Payment Methods</h2>
              <p className="section-description">
                Payments for your subscription are made using the default card.
              </p>
            </div>
            <div className="section-right">
              <div className="payment-methods-card">
                <div className="no-payment-methods">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <span className="no-methods-text">No payment methods</span>
                </div>
                <button className="add-card-btn">
                  <Plus className="w-4 h-4" />
                  Add new card
                </button>
              </div>
            </div>
          </div>

          {/* Credit Balance Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Credit Balance</h2>
              <p className="section-description">
                Credits will be applied to future invoices, before charging your payment 
                method. If your credit balance runs out, your default payment method will be charged.
              </p>
            </div>
            <div className="section-right">
              <div className="credit-balance-card">
                <div className="balance-info">
                  <span className="balance-label">Balance</span>
                  <span className="balance-amount">$ 0.00</span>
                </div>
                <button className="top-up-btn">
                  Top Up
                </button>
              </div>
            </div>
          </div>

          {/* Email Recipient Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Email Recipient</h2>
              <p className="section-description">
                All billing correspondence will go to this email
              </p>
            </div>
            <div className="section-right">
              <div className="email-recipient-card">
                <div className="form-group">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Additional emails
                    <span className="label-icon">
                      <AlertCircle className="w-4 h-4" />
                    </span>
                  </label>
                  <input
                    type="text"
                    value={additionalEmails}
                    onChange={(e) => setAdditionalEmails(e.target.value)}
                    placeholder="Add additional recipients"
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button className="cancel-btn">Cancel</button>
                  <button className="save-btn" onClick={handleSaveEmailRecipient}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address & Tax ID Section */}
          <div className="billing-section">
            <div className="section-left">
              <h2 className="section-title">Billing Address & Tax ID</h2>
              <p className="section-description">
                This will be reflected in every upcoming invoice, past invoices are not affected
              </p>
            </div>
            <div className="section-right">
              <div className="billing-address-card">
                <div className="form-grid">
                  <div className="form-group form-group-full">
                    <input
                      type="text"
                      value={billingInfo.name}
                      onChange={(e) => handleBillingInfoChange('name', e.target.value)}
                      className="form-input"
                      placeholder="Organization name"
                    />
                  </div>
                  
                  <div className="form-group form-group-full">
                    <input
                      type="text"
                      value={billingInfo.address}
                      onChange={(e) => handleBillingInfoChange('address', e.target.value)}
                      className="form-input"
                      placeholder="Address"
                    />
                  </div>
                  
                  <div className="form-group form-group-full">
                    <input
                      type="text"
                      value={billingInfo.address2}
                      onChange={(e) => handleBillingInfoChange('address2', e.target.value)}
                      className="form-input"
                      placeholder="Address line 2 (Optional)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <select
                      value={billingInfo.country}
                      onChange={(e) => handleBillingInfoChange('country', e.target.value)}
                      className="form-select"
                    >
                      <option value="United States of America">United States of America</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      value={billingInfo.zipCode}
                      onChange={(e) => handleBillingInfoChange('zipCode', e.target.value)}
                      className="form-input"
                      placeholder="ZIP Code"
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      value={billingInfo.city}
                      onChange={(e) => handleBillingInfoChange('city', e.target.value)}
                      className="form-input"
                      placeholder="City"
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      value={billingInfo.state}
                      onChange={(e) => handleBillingInfoChange('state', e.target.value)}
                      className="form-input"
                      placeholder="State"
                    />
                  </div>
                  
                  <div className="form-group form-group-full">
                    <label className="form-label">Tax ID</label>
                    <select
                      value={billingInfo.taxId}
                      onChange={(e) => handleBillingInfoChange('taxId', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select tax ID</option>
                      <option value="ein">EIN (Employer Identification Number)</option>
                      <option value="ssn">SSN (Social Security Number)</option>
                      <option value="vat">VAT Number</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="cancel-btn">Cancel</button>
                  <button className="save-btn" onClick={handleSaveBillingInfo}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing
