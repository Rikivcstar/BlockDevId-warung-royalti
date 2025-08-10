;; Simple Token - SIP-010 Standard Implementation
;; Workshop Version: Minimal but compliant

;; Implement SIP-010 fungible token trait
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard.sip-010-trait)

;; Define the token
(define-fungible-token workshop-token)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

;; Token metadata
(define-constant token-name "techrick")
(define-constant token-symbol "TCK")
(define-constant token-decimals u6)
(define-constant token-uri u"https://workshop.blockdev.id/token.json")

;; SIP-010 required functions
(define-read-only (get-name)
  (ok token-name)
)

(define-read-only (get-symbol)
  (ok token-symbol)
)

(define-read-only (get-decimals)
  (ok token-decimals)
)

(define-read-only (get-balance (user principal))
  (ok (ft-get-balance workshop-token user))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply workshop-token))
)

(define-read-only (get-token-uri)
  (ok (some token-uri))
)

;; SIP-010 transfer function
(define-public (transfer (amount uint) (from principal) (to principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq from tx-sender) err-not-token-owner)
    (ft-transfer? workshop-token amount from to)
  )
)

;; Mint function (owner only)
(define-public (mint (amount uint) (to principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ft-mint? workshop-token amount to)
  )
)

;; === Fitur Warung Royalti ===

;; Owner kasih poin reward ke pelanggan
(define-public (reward-customer (customer principal) (amount uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ft-mint? workshop-token amount customer)
  )
)

;; Pelanggan kirim poin ke warung lain / orang lain
(define-public (send-points (amount uint) (recipient principal))
  (begin
    (asserts! (> amount u0) (err u102))
    (ft-transfer? workshop-token amount tx-sender recipient)
  )
)

;; Cek saldo poin pelanggan
(define-read-only (check-points (customer principal))
  (ok (ft-get-balance workshop-token customer))
)

