import React, { useState, useRef, useEffect } from 'react';
import { Play, RefreshCw, Terminal, CheckCircle2, AlertCircle, Info, Cpu, Zap, ShoppingCart, Truck, Mail, Package, Printer, User, ArrowRight } from 'lucide-react';
import { automationLogSteps } from '../data/mockData';

export default function AutomationConsole() {
  const [activeSubTab, setActiveSubTab] = useState('pipeline'); // 'pipeline' | 'warehouse'
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeNode, setActiveNode] = useState(0); 
  const logEndRef = useRef(null);

  // Warehouse Packing Queue State
  const [packingQueue, setPackingQueue] = useState([
    { id: 'EC-9402', customer: 'Liam Neeson', item: 'Ford Transit Mirror (Drivers Side)', location: 'Shelf B-12, Bin 4', status: 'Awaiting Packing' },
    { id: 'EC-9403', customer: 'Emma Watson', item: 'Powerflex Wishbone Bush Kit', location: 'Shelf D-04, Bin 9', status: 'Awaiting Packing' },
    { id: 'EC-9401', customer: 'David Miller', item: 'BMW M-Style Mirror Covers', location: 'Shelf A-02, Bin 15', status: 'Packed & Labeled' }
  ]);

  const [manifestQueue, setManifestQueue] = useState([
    { id: 'EC-9401', customer: 'David Miller', tracking: 'DPD-9842018', status: 'Awaiting Collection' }
  ]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Digital Pipeline Simulation
  const startSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setActiveNode(1); // Shopify Trigger

    automationLogSteps.forEach(step => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        
        if (step.message.includes('fraud')) {
          setActiveNode(2);
        } else if (step.message.includes('warehouse')) {
          setActiveNode(3);
        } else if (step.message.includes('DPD')) {
          setActiveNode(4);
        } else if (step.message.includes('SMS')) {
          setActiveNode(5);
        } else if (step.message.includes('fully automated')) {
          setActiveNode(6);
          setIsRunning(false);
          // Automatically add the new order to the warehouse packing queue!
          setPackingQueue(prev => [
            { id: 'EC-9402', customer: 'Liam Neeson', item: 'Ford Transit Mirror (Drivers Side)', location: 'Shelf B-12, Bin 4', status: 'Awaiting Packing' },
            ...prev.filter(p => p.id !== 'EC-9402')
          ]);
        }
      }, step.timeOffset);
    });
  };

  // Physical Warehouse Packing Action
  const handlePackItem = (id) => {
    // 1. Mark as packed
    setPackingQueue(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'Packed & Labeled' } : item
      )
    );

    // 2. Simulate printing DPD label and adding to DPD pallet (manifest)
    const packedItem = packingQueue.find(item => item.id === id);
    if (packedItem) {
      const trackingId = `DPD-${Math.floor(1000000 + Math.random() * 9000000)}`;
      setManifestQueue(prev => [
        ...prev,
        { id: packedItem.id, customer: packedItem.customer, tracking: trackingId, status: 'Awaiting Collection' }
      ]);
    }
  };

  const [showManifestModal, setShowManifestModal] = useState(false);
  const [manifestSummary, setManifestSummary] = useState(null);

  // Courier Collection Action
  const handleDispatchCollection = () => {
    const pendingCount = manifestQueue.filter(m => m.status === 'Awaiting Collection').length;
    
    setManifestSummary({
      manifestId: `MNF-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: 'DPD Next-Day',
      totalParcels: pendingCount,
      weight: (pendingCount * 2.1).toFixed(1),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setManifestQueue(prev => 
      prev.map(item => ({ ...item, status: 'Collected by DPD' }))
    );
    
    setShowManifestModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={28} style={{ color: 'var(--brand-color)' }} />
          Fulfillment & Warehouse Operations
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Manage the bridge between digital orders and physical warehouse operations. Automate pick-and-pack lists and courier collections.
        </p>
      </div>

      {/* Sub-navigation inside tab */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveSubTab('pipeline')}
          style={{ 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            color: activeSubTab === 'pipeline' ? 'var(--brand-color)' : 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          1. Digital Pipeline (API Flow)
        </button>
        <span style={{ color: 'var(--text-muted)' }}>|</span>
        <button 
          onClick={() => setActiveSubTab('warehouse')}
          style={{ 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            color: activeSubTab === 'warehouse' ? 'var(--brand-color)' : 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          2. Warehouse Pick & Pack (Staff View)
        </button>
      </div>

      {/* --- SUB-TAB 1: DIGITAL PIPELINE --- */}
      {activeSubTab === 'pipeline' && (
        <>
          {/* Visual Pipeline Map */}
          <div 
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '2rem',
              position: 'relative'
            }}
          >
            <h3 style={{ fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>Automated Dispatch Workflow</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
              
              <div 
                style={{ 
                  flex: 1, minWidth: '120px', backgroundColor: activeNode === 1 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
                  border: activeNode === 1 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
                  padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', transition: 'var(--transition-smooth)'
                }}
              >
                <ShoppingCart size={20} style={{ color: activeNode === 1 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>1. Shopify Order</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Webhook Trigger</div>
              </div>

              <div style={{ width: '15px', height: '2px', backgroundColor: activeNode > 1 ? 'var(--brand-color)' : 'var(--border-color)' }} />

              <div 
                style={{ 
                  flex: 1, minWidth: '120px', backgroundColor: activeNode === 2 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
                  border: activeNode === 2 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
                  padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', transition: 'var(--transition-smooth)'
                }}
              >
                <Cpu size={20} style={{ color: activeNode === 2 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>2. Fraud Check</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Auto Risk Scan</div>
              </div>

              <div style={{ width: '15px', height: '2px', backgroundColor: activeNode > 2 ? 'var(--brand-color)' : 'var(--border-color)' }} />

              <div 
                style={{ 
                  flex: 1, minWidth: '120px', backgroundColor: activeNode === 3 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
                  border: activeNode === 3 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
                  padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', transition: 'var(--transition-smooth)'
                }}
              >
                <Package size={20} style={{ color: activeNode === 3 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>3. Pick List Auto</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Sent to Warehouse</div>
              </div>

              <div style={{ width: '15px', height: '2px', backgroundColor: activeNode > 3 ? 'var(--brand-color)' : 'var(--border-color)' }} />

              <div 
                style={{ 
                  flex: 1, minWidth: '120px', backgroundColor: activeNode === 4 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
                  border: activeNode === 4 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
                  padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', transition: 'var(--transition-smooth)'
                }}
              >
                <Truck size={20} style={{ color: activeNode === 4 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>4. DPD Label API</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Auto Consignment</div>
              </div>

              <div style={{ width: '15px', height: '2px', backgroundColor: activeNode > 4 ? 'var(--brand-color)' : 'var(--border-color)' }} />

              <div 
                style={{ 
                  flex: 1, minWidth: '120px', backgroundColor: activeNode === 5 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
                  border: activeNode === 5 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
                  padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', transition: 'var(--transition-smooth)'
                }}
              >
                <Mail size={20} style={{ color: activeNode === 5 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>5. Twilio SMS</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Customer Alert</div>
              </div>

            </div>
          </div>

          {/* Terminal and Trigger Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
            
            <div style={{ backgroundColor: '#000000', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #222', paddingBottom: '0.75rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <Terminal size={14} />
                <span>Fulfillment Automation Log</span>
                {isRunning && <RefreshCw className="spin" size={12} style={{ marginLeft: 'auto', color: 'var(--brand-color)' }} />}
              </div>
              
              <div style={{ minHeight: '240px', maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', lineHeight: '1.4' }}>
                {logs.length > 0 ? (
                  logs.map((log, idx) => {
                    let color = '#fff';
                    if (log.type === 'success') color = 'var(--success-color)';
                    if (log.type === 'complete') color = 'var(--brand-color)';
                    return (
                      <div key={idx} style={{ color }}>
                        {log.message}
                      </div>
                    );
                  })
                ) : (
                  <div style={{ color: '#555', textAlign: 'center', padding: '5rem 0' }}>
                    System Idle. Click "Trigger Simulated Order" to run pipeline.
                  </div>
                )}
                <div ref={logEndRef} />
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Automation Controller</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Simulate a customer checking out on Shopify. The system automatically processes payment, verifies inventory, maps the item to the warehouse queue, and books shipping.
              </p>

              <button 
                onClick={startSimulation}
                disabled={isRunning}
                className="btn-primary btn" 
                style={{ width: '100%', height: '44px', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
              >
                <Play size={16} />
                {isRunning ? 'Running...' : 'Trigger Simulated Order'}
              </button>
            </div>

          </div>
        </>
      )}

      {/* --- SUB-TAB 2: WAREHOUSE PICK & PACK --- */}
      {activeSubTab === 'warehouse' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Warehouse Packing Queue Table */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} style={{ color: 'var(--brand-color)' }} />
              Warehouse Pick & Pack Queue
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {packingQueue.map(item => (
                <div 
                  key={item.id} 
                  style={{ 
                    backgroundColor: 'var(--bg-tertiary)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{item.id}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>&bull; {item.customer}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '0.25rem', color: 'var(--brand-color)' }}>{item.item}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                      Location: <strong>{item.location}</strong>
                    </div>
                  </div>
                  
                  <div>
                    {item.status === 'Awaiting Packing' ? (
                      <button 
                        onClick={() => handlePackItem(item.id)}
                        className="btn-primary btn"
                        style={{ height: '36px', fontSize: '0.8rem', display: 'flex', gap: '0.35rem' }}
                      >
                        <Printer size={14} />
                        Pack & Print DPD Label
                      </button>
                    ) : (
                      <span className="badge badge-success" style={{ display: 'flex', gap: '0.25rem' }}>
                        <CheckCircle2 size={12} />
                        Packed & Labeled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DPD Collection Pallet (Manifest) */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} style={{ color: 'var(--brand-color)' }} />
              DPD Collection Pallet
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Once items are packed and labeled, they are placed on the DPD pallet. Manifest the collection when the DPD driver arrives at the warehouse.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                Awaiting Collection ({manifestQueue.filter(m => m.status === 'Awaiting Collection').length} parcels)
              </span>
              
              {manifestQueue.length > 0 ? (
                manifestQueue.map(parcel => (
                  <div key={parcel.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', paddingTop: '0.25rem' }}>
                    <div>
                      <strong>{parcel.id}</strong> ({parcel.customer})
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tracking: {parcel.tracking}</div>
                    </div>
                    <div>
                      {parcel.status === 'Awaiting Collection' ? (
                        <span style={{ color: '#ffb800', fontWeight: 'bold' }}>Ready</span>
                      ) : (
                        <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>Collected</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
                  No parcels on pallet yet.
                </span>
              )}
            </div>

            <button 
              onClick={handleDispatchCollection}
              disabled={manifestQueue.filter(m => m.status === 'Awaiting Collection').length === 0}
              className="btn-primary btn"
              style={{ width: '100%', height: '40px', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
            >
              <Truck size={16} />
              Manifest DPD Collection
            </button>
          </div>

        </div>
      )}

      {/* --- DPD COLLECTION MANIFEST MODAL --- */}
      {showManifestModal && manifestSummary && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.8)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
        >
          <div 
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '2.5rem', 
              maxWidth: '440px', 
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
              textAlign: 'center',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <Truck size={48} style={{ color: 'var(--brand-color)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>DPD Handover Confirmed</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Collection manifest successfully generated and transmitted to DPD.
            </p>

            {/* Manifest Details */}
            <div 
              style={{ 
                backgroundColor: 'var(--bg-tertiary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)', 
                padding: '1rem',
                textAlign: 'left',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Manifest ID:</span>
                <strong style={{ fontFamily: 'monospace' }}>{manifestSummary.manifestId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Carrier:</span>
                <strong>{manifestSummary.carrier}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Parcels:</span>
                <strong>{manifestSummary.totalParcels}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Weight:</span>
                <strong>{manifestSummary.weight} kg</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Handover Time:</span>
                <strong>{manifestSummary.timestamp}</strong>
              </div>
            </div>

            {/* Simulated Driver Barcode */}
            <div 
              style={{ 
                backgroundColor: '#fff', 
                padding: '1rem', 
                borderRadius: 'var(--radius-sm)', 
                display: 'inline-block',
                marginBottom: '1.5rem'
              }}
            >
              {/* Virtual Barcode using lines */}
              <div style={{ display: 'flex', height: '40px', width: '150px', backgroundColor: '#000', gap: '2px', overflow: 'hidden' }}>
                <div style={{ width: '4px', backgroundColor: '#fff' }} />
                <div style={{ width: '8px', backgroundColor: '#fff' }} />
                <div style={{ width: '2px', backgroundColor: '#fff' }} />
                <div style={{ width: '6px', backgroundColor: '#fff' }} />
                <div style={{ width: '3px', backgroundColor: '#fff' }} />
                <div style={{ width: '8px', backgroundColor: '#fff' }} />
                <div style={{ width: '1px', backgroundColor: '#fff' }} />
                <div style={{ width: '5px', backgroundColor: '#fff' }} />
                <div style={{ width: '7px', backgroundColor: '#fff' }} />
              </div>
              <div style={{ fontSize: '0.65rem', color: '#000', marginTop: '0.25rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
                {manifestSummary.manifestId}
              </div>
            </div>

            <button 
              className="btn-primary btn" 
              style={{ width: '100%', height: '40px' }}
              onClick={() => setShowManifestModal(false)}
            >
              Close & Notify Customers
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
